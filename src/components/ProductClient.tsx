"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag
} from "lucide-react";

import { Product, formatPrice, products } from "@/data/products";
import { useStore } from "@/components/StoreProvider";
import ProductCard from "@/components/ProductCard";

export default function ProductClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    addToBag,
    bagCount,
    toggleWishlist,
    isWishlisted
  } = useStore();

  const related = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  const add = () => {
    for (let i = 0; i < quantity; i++) {
      addToBag(product);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f5f2]">

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f5f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">

          <Link
            href="/shop"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-black/50"
          >
            <ArrowLeft size={14} />
            Collection
          </Link>

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

      <section className="mx-auto max-w-[1500px] px-5 py-8 md:px-8 md:py-12 lg:px-10">

        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">

          <div className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-[18px] bg-[#ecebe7] ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full object-cover transition duration-700 ${
                    index === selectedImage
                      ? "scale-[1.01]"
                      : ""
                  } ${
                    index === 0
                      ? "aspect-[1.15]"
                      : "aspect-square"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">

            <p className="text-[9px] uppercase tracking-[.25em] text-black/35">
              {product.category}
            </p>

            <h1 className="luxe-serif mt-3 text-5xl leading-[.95] tracking-[-.05em] md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-[500px] text-sm leading-7 text-black/55">
              {product.description}
            </p>

            {product.colors && (
              <div className="mt-8">
                <p className="text-[9px] uppercase tracking-[.2em] text-black/40">
                  Color
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="rounded-full border border-black/15 px-4 py-2 text-[9px] uppercase tracking-[.15em]"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mt-8">
                <p className="text-[9px] uppercase tracking-[.2em] text-black/40">
                  Size
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="flex h-10 min-w-10 items-center justify-center rounded-full border border-black/15 px-3 text-[9px]"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-9 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-black/10 bg-white">
                <button
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="flex h-12 w-12 items-center justify-center"
                >
                  <Minus size={14} />
                </button>

                <span className="w-8 text-center text-xs">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-12 w-12 items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={add}
                className="flex h-12 flex-1 items-center justify-center gap-3 rounded-full bg-black text-[9px] uppercase tracking-[.2em] text-white transition hover:bg-black/80"
              >
                Add to bag
                <ShoppingBag size={15} strokeWidth={1.3} />
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white"
              >
                <Heart
                  size={17}
                  strokeWidth={1.3}
                  fill={
                    isWishlisted(product.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
              <div className="py-5">
                <p className="text-xs font-medium">Worldwide delivery</p>
                <p className="mt-1 text-[11px] leading-5 text-black/40">
                  Complimentary delivery on qualifying orders.
                </p>
              </div>

              <div className="py-5">
                <p className="text-xs font-medium">Easy returns</p>
                <p className="mt-1 text-[11px] leading-5 text-black/40">
                  Simple 14-day return experience.
                </p>
              </div>

              <div className="py-5">
                <p className="text-xs font-medium">Personal support</p>
                <p className="mt-1 text-[11px] leading-5 text-black/40">
                  Our concierge team is here when you need us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white px-5 py-20 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p className="text-[9px] uppercase tracking-[.25em] text-black/35">
              You may also like
            </p>

            <h2 className="luxe-serif mt-3 text-5xl tracking-[-.05em]">
              More from {product.category}.
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  liked={isWishlisted(item.id)}
                  onLike={() => toggleWishlist(item.id)}
                  onAdd={() => addToBag(item)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
