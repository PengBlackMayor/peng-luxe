"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "@/components/StoreProvider";

export default function BagPage() {
  const {
    bag,
    bagCount,
    bagTotal,
    removeFromBag,
    updateQuantity,
    clearBag
  } = useStore();

  return (
    <main className="min-h-screen bg-[#f6f5f2]">

      <header className="border-b border-black/10 bg-[#f6f5f2]">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">
          <Link href="/" className="text-xl font-semibold tracking-[-.06em]">
            PENG<span className="font-light">LUXE</span>
          </Link>

          <Link
            href="/shop"
            className="text-[9px] uppercase tracking-[.18em] text-black/50"
          >
            Continue shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">

        <Link
          href="/shop"
          className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-black/45"
        >
          <ArrowLeft size={13} />
          Continue shopping
        </Link>

        <div className="mt-10 flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <p className="text-[9px] uppercase tracking-[.25em] text-black/35">
              Your selection
            </p>

            <h1 className="luxe-serif mt-2 text-6xl tracking-[-.06em]">
              Your bag.
            </h1>
          </div>

          {bag.length > 0 && (
            <button
              onClick={clearBag}
              className="text-[9px] uppercase tracking-[.18em] text-black/40 hover:text-black"
            >
              Clear all
            </button>
          )}
        </div>

        {bag.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="luxe-serif text-5xl">
              Your bag is empty.
            </h2>

            <p className="mx-auto mt-4 max-w-[420px] text-sm leading-6 text-black/40">
              Discover the collection and add something that feels like you.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-[9px] uppercase tracking-[.2em] text-white"
            >
              Explore collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_350px]">

            <div className="divide-y divide-black/10 border-y border-black/10">
              {bag.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-5 md:gap-6"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-white md:h-40 md:w-32"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-[.18em] text-black/35">
                        {item.category}
                      </p>

                      <h2 className="mt-1 text-sm font-medium">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-black/10 bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-7 text-center text-[10px]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBag(item.id)}
                        className="flex items-center gap-2 text-[8px] uppercase tracking-[.16em] text-black/35 hover:text-black"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[20px] bg-white p-7">
              <p className="text-[9px] uppercase tracking-[.2em] text-black/35">
                Summary
              </p>

              <div className="mt-7 flex justify-between text-sm">
                <span>Pieces</span>
                <span>{bagCount}</span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(bagTotal)}</span>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium">
                    {formatPrice(bagTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#f6f5f2] p-4">
                <p className="text-[9px] uppercase tracking-[.15em]">
                  Shopping experience
                </p>

                <p className="mt-2 text-[11px] leading-5 text-black/45">
                  This is a presentation bag for the PENG LUXE experience.
                  Checkout and payments are intentionally not enabled yet.
                </p>
              </div>

              <Link
                href="/shop"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-black py-4 text-[9px] uppercase tracking-[.2em] text-white"
              >
                Continue exploring
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
