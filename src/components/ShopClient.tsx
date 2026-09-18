"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useStore } from "@/components/StoreProvider";

export default function ShopClient() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [category, setCategory] = useState(initialCategory);
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState(initialSearch);

  const { bagCount, addToBag, toggleWishlist, isWishlisted } = useStore();

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      const matchesFilter =
        filter !== "new" || product.new === true;

      const matchesSearch =
        !search.trim() ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesFilter && matchesSearch;
    });
  }, [category, filter, search]);

  return (
    <main className="min-h-screen bg-[#f6f5f2]">

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f5f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">

          <Link href="/" className="text-xl font-semibold tracking-[-.06em]">
            PENG<span className="font-light">LUXE</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
            >
              <Heart size={17} strokeWidth={1.3} />
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
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-8 lg:px-10 lg:py-16">

        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-black/45"
        >
          <ArrowLeft size={13} />
          Back home
        </Link>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[.3em] text-black/40">
              PENG LUXE
            </p>

            <h1 className="luxe-serif mt-3 text-6xl tracking-[-.06em]">
              The collection.
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-black/50">
              Explore watches, leather, jewelry, sneakers and modern
              accessories selected for the contemporary collector.
            </p>
          </div>

          <p className="text-[9px] uppercase tracking-[.18em] text-black/40">
            {filtered.length} pieces
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-black/10 py-5 md:flex-row md:items-center md:justify-between">

          <div className="hide-scrollbar flex gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setCategory("all");
                setFilter("all");
              }}
              className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[9px] uppercase tracking-[.16em] ${
                category === "all" && filter === "all"
                  ? "border-black bg-black text-white"
                  : "border-black/10"
              }`}
            >
              All
            </button>

            {categories.map((item) => (
              <button
                key={item.slug}
                onClick={() => {
                  setCategory(item.slug);
                  setFilter("all");
                }}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[9px] uppercase tracking-[.16em] ${
                  category === item.slug
                    ? "border-black bg-black text-white"
                    : "border-black/10"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            className="rounded-full border border-black/10 bg-white px-5 py-3 text-xs outline-none placeholder:text-black/30 md:w-56"
          />
        </div>

        {filter === "new" && (
          <div className="mt-5">
            <button
              onClick={() => setFilter("all")}
              className="rounded-full bg-black px-4 py-2 text-[9px] uppercase tracking-[.16em] text-white"
            >
              New arrivals ×
            </button>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              liked={isWishlisted(product.id)}
              onLike={() => toggleWishlist(product.id)}
              onAdd={() => addToBag(product)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <h2 className="luxe-serif text-4xl">
              Nothing found.
            </h2>
            <p className="mt-3 text-sm text-black/40">
              Try another search or collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
