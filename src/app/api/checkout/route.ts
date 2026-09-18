import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const itemSchema = z.object({
  slug: z.string().min(1).max(200),
  quantity: z.number().int().min(1).max(20),
});

const checkoutSchema = z.object({
  items: z.array(itemSchema).min(1).max(50),

  email: z.string().email(),

  shippingName: z.string().min(2).max(100),
  shippingPhone: z.string().min(5).max(30),
  shippingAddress: z.string().min(3).max(300),
  shippingCity: z.string().min(2).max(100),
  shippingState: z.string().min(2).max(100),
  shippingCountry: z.string().min(2).max(100),
  shippingPostalCode: z.string().min(2).max(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid checkout information",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const uniqueSlugs = [
      ...new Set(data.items.map((item) => item.slug)),
    ];

    const products = await prisma.product.findMany({
      where: {
        slug: {
          in: uniqueSlugs,
        },
        active: true,
      },
    });

    if (products.length !== uniqueSlugs.length) {
      return NextResponse.json(
        {
          error:
            "One or more products are unavailable.",
        },
        { status: 400 }
      );
    }

    const productMap = new Map(
      products.map((product) => [
        product.slug,
        product,
      ])
    );

    let subtotal = 0;

    const orderItems = data.items.map((item) => {
      const product = productMap.get(item.slug);

      if (!product) {
        throw new Error(
          `Product ${item.slug} was not found`
        );
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} does not have enough stock`
        );
      }

      const price = Number(product.price);

      subtotal += price * item.quantity;

      const images = Array.isArray(product.images)
        ? product.images
        : [];

      return {
        productId: product.id,
        name: product.name,
        price,
        quantity: item.quantity,
        image:
          typeof images[0] === "string"
            ? images[0]
            : null,
      };
    });

    const shipping = subtotal >= 500 ? 0 : 25;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const order = await prisma.order.create({
      data: {
        email: data.email,
        status: "PENDING",
        paymentStatus: "PENDING",

        subtotal,
        shipping,
        tax,
        total,

        shippingName: data.shippingName,
        shippingPhone: data.shippingPhone,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingState: data.shippingState,
        shippingCountry: data.shippingCountry,
        shippingPostalCode: data.shippingPostalCode,

        items: {
          create: orderItems,
        },
      },
    });

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(request.url).origin;

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: data.email,

        line_items: orderItems.map((item) => ({
          quantity: item.quantity,

          price_data: {
            currency: "usd",

            product_data: {
              name: item.name,

              ...(item.image
                ? {
                    images: [item.image],
                  }
                : {}),
            },

            unit_amount: Math.round(
              item.price * 100
            ),
          },
        })),

        shipping_address_collection: {
          allowed_countries: [
            "US",
            "CA",
            "GB",
            "NG",
            "AE",
            "FR",
            "DE",
            "IT",
            "ES",
          ],
        },

        metadata: {
          orderId: order.id,
        },

        success_url:
          `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/checkout/cancel?order_id=${order.id}`,
      });

    if (!session.url) {
      throw new Error(
        "Stripe did not return a checkout URL"
      );
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Checkout failed";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}