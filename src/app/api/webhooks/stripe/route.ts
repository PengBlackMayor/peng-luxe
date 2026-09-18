import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature =
    request.headers.get("stripe-signature");

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      {
        error: "Stripe webhook configuration is missing",
      },
      { status: 400 }
    );
  }

  try {
    const body = await request.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            paymentStatus: "PAID",
            status: "PROCESSING",
            stripePaymentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
          },
        });

        const order =
          await prisma.order.findUnique({
            where: {
              id: orderId,
            },
            include: {
              items: true,
            },
          });

        if (order) {
          for (const item of order.items) {
            await prisma.product.update({
              where: {
                id: item.productId,
              },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            });
          }
        }
      }
    }

    if (
      event.type ===
      "checkout.session.expired"
    ) {
      const session =
        event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "CANCELLED",
            paymentStatus: "FAILED",
          },
        });
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook error:",
      error
    );

    return NextResponse.json(
      {
        error: "Webhook verification failed",
      },
      { status: 400 }
    );
  }
}