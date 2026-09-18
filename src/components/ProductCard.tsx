"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

type Props = {
  product: Product;
  liked?: boolean;
  onLike?: () => void;
  onAdd?: () => void;
};

export default function ProductCard({
  product,
  liked = false,
  onLike,
  onAdd
}: Props) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[18px] bg-[#f0efeb]">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-[.82] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
            />
          </div>
        </Link>

        {product.new && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[8px] uppercase tracking-[.18em] backdrop-blur">
            New
          </span>
        )}

        {onLike && (
          <button
            onClick={onLike}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur transition hover:bg-white"
          >
            <Heart
              size={15}
              strokeWidth={1.3}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        )}

        {onAdd && (
          <button
            onClick={onAdd}
            aria-label={`Add ${product.name} to bag`}
            className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-black text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus size={16} strokeWidth={1.3} />
          </button>
        )}
      </div>

      <Link href={`/products/${product.slug}`} className="block pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[8px] uppercase tracking-[.18em] text-black/35">
              {product.category}
            </p>
            <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
          </div>

          <span className="text-sm">{formatPrice(product.price)}</span>
        </div>

        <p className="mt-2 line-clamp-1 text-[11px] text-black/40">
          {product.shortDescription}
        </p>
      </Link>
    </article>
  );
}
