"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/components/StoreProvider";

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    addToBag,
    isWishlisted,
    bagCount
  } = useStore();

  const items = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <main className="min-h-screen bg-[#f6f5f2]">

      <header className="border-b border-black/10">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">

          <Link href="/" className="text-xl font-semibold tracking-[-.06em]">
            PENG<span className="font-light">LUXE</span>
          </Link>

          <Link
            href="/bag"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
          >
            <ShoppingBag size={17} strokeWidth={1.3} />

            {bagCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[8px] text-white">
                {bagCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 md:py-16 lg:px-10">

        <Link
          href="/shop"
          className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-black/45"
        >
          <ArrowLeft size={13} />
          Collection
        </Link>

        <div className="mt-10">
          <p className="text-[9px] uppercase tracking-[.25em] text-black/35">
            Saved pieces
          </p>

          <h1 className="luxe-serif mt-2 text-6xl tracking-[-.06em]">
            Wishlist.
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="luxe-serif text-5xl">
              Nothing saved yet.
            </h2>

            <p className="mt-4 text-sm text-black/40">
              Save pieces that catch your eye and come back to them later.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-[9px] uppercase tracking-[.2em] text-white"
            >
              Explore collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liked={isWishlisted(product.id)}
                onLike={() => toggleWishlist(product.id)}
                onAdd={() => addToBag(product)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
