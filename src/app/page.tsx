"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { useStore } from "@/components/StoreProvider";

const brands = [
  "PENG LUXE",
  "ATELIER",
  "MONUMENT",
  "MAISON",
  "NOIR",
  "SIGNATURE"
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const {
    bagCount,
    addToBag,
    toggleWishlist,
    isWishlisted
  } = useStore();

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;

    return products.filter((product) => product.category === filter);
  }, [filter]);

  const submitNewsletter = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-[#f6f5f2] text-[#111]">

      {/* ANNOUNCEMENT */}
      <div className="flex min-h-8 items-center justify-center bg-black px-4 text-center text-[8px] uppercase tracking-[.28em] text-white">
        Complimentary worldwide shipping on orders over $500
      </div>

      {/* NAVBAR */}
      <header className="absolute left-0 right-0 top-8 z-40 border-b border-white/15 text-white">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">

          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 lg:hidden"
          >
            <Menu size={19} strokeWidth={1.3} />
            <span className="text-[9px] uppercase tracking-[.2em]">
              Menu
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {["New In", "Watches", "Bags", "Jewelry", "Sneakers"].map(
              (item) => (
                <Link
                  key={item}
                  href={
                    item === "New In"
                      ? "/shop?filter=new"
                      : `/shop?category=${item.toLowerCase()}`
                  }
                  className="text-[10px] uppercase tracking-[.16em] text-white/75 transition hover:text-white"
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold tracking-[-.06em]"
          >
            PENG<span className="font-light">LUXE</span>
          </Link>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
            >
              <Search size={17} strokeWidth={1.3} />
            </button>

            <Link
              href="/wishlist"
              className="hidden h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 md:flex"
            >
              <Heart size={17} strokeWidth={1.3} />
            </Link>

            <Link
              href="/bag"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
            >
              <ShoppingBag size={17} strokeWidth={1.3} />

              {bagCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[8px] text-black">
                  {bagCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/15 bg-black/70 px-5 py-4 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[700px] items-center gap-3">
              <Search size={16} strokeWidth={1.3} />

              <input
                autoFocus
                placeholder="Search the collection..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    window.location.href = `/shop?search=${encodeURIComponent(
                      event.currentTarget.value
                    )}`;
                  }
                }}
              />

              <button onClick={() => setSearchOpen(false)}>
                <X size={17} strokeWidth={1.3} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] bg-[#f6f5f2] transition duration-500 ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-black/10 px-5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold tracking-[-.06em]"
          >
            PENG<span className="font-light">LUXE</span>
          </Link>

          <button onClick={() => setMenuOpen(false)}>
            <X size={22} strokeWidth={1.3} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8">
          {[
            "New In",
            "Watches",
            "Bags",
            "Jewelry",
            "Sneakers",
            "Fragrance",
            "Accessories"
          ].map((item, index) => (
            <Link
              key={item}
              href={
                item === "New In"
                  ? "/shop?filter=new"
                  : `/shop?category=${item.toLowerCase()}`
              }
              onClick={() => setMenuOpen(false)}
              className="border-b border-black/10 py-5 text-3xl tracking-[-.04em]"
            >
              <span className="mr-3 text-[9px] text-black/30">
                0{index + 1}
              </span>
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#162328] text-white md:min-h-[820px]">
        <img
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2200&q=92"
          alt="Luxury watch"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

        <div className="relative mx-auto flex min-h-[760px] max-w-[1500px] items-end px-5 pb-16 pt-36 md:min-h-[820px] md:px-8 md:pb-20 lg:px-10">
          <div className="max-w-[760px]">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-white/60" />
              <span className="text-[9px] uppercase tracking-[.35em] text-white/70">
                The new collection · 2026
              </span>
            </div>

            <h1 className="luxe-serif max-w-[720px] text-[68px] leading-[.84] tracking-[-.055em] md:text-[105px] lg:text-[128px]">
              A higher
              <br />
              standard.
            </h1>

            <p className="mt-7 max-w-[430px] text-sm leading-6 text-white/65 md:text-[15px]">
              Curated objects for people who notice the details. Discover
              watches, leather, jewelry and modern essentials designed to live
              beyond the moment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="group flex items-center gap-7 rounded-full bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[.18em] text-black"
              >
                Shop collection
                <ArrowRight
                  size={15}
                  strokeWidth={1.4}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#story"
                className="flex items-center gap-3 rounded-full border border-white/30 px-6 py-3.5 text-[10px] uppercase tracking-[.18em] backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                Discover the story
                <ArrowDown size={14} strokeWidth={1.3} />
              </a>
            </div>

            <div className="mt-12 grid max-w-[600px] grid-cols-3 border-t border-white/20 pt-5">
              <div>
                <strong className="text-2xl font-light">100+</strong>
                <p className="mt-1 text-[8px] uppercase tracking-[.18em] text-white/45">
                  Curated pieces
                </p>
              </div>

              <div className="border-l border-white/20 pl-5">
                <strong className="text-2xl font-light">24</strong>
                <p className="mt-1 text-[8px] uppercase tracking-[.18em] text-white/45">
                  Global cities
                </p>
              </div>

              <div className="border-l border-white/20 pl-5">
                <strong className="text-2xl font-light">4.9</strong>
                <p className="mt-1 text-[8px] uppercase tracking-[.18em] text-white/45">
                  Client rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[#f6f5f2] px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-[1500px]">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[.28em] text-black/40">
                Explore the collection
              </p>

              <h2 className="luxe-serif mt-2 text-4xl tracking-[-.04em] md:text-5xl">
                Find your signature.
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] md:flex"
            >
              View all
              <ArrowRight size={14} strokeWidth={1.3} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                href={`/shop?category=${category.slug}`}
                key={category.name}
                className="group relative aspect-[.82] overflow-hidden rounded-[16px] bg-[#deddd8]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="luxe-serif text-xl">{category.name}</h3>

                  <p className="mt-1 text-[9px] tracking-wide text-white/65">
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section id="collection" className="bg-white px-5 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles size={14} strokeWidth={1.3} />
                <p className="text-[9px] uppercase tracking-[.28em] text-black/45">
                  Hand selected
                </p>
              </div>

              <h2 className="luxe-serif mt-3 text-5xl tracking-[-.05em] md:text-6xl">
                Featured collection
              </h2>
            </div>

            <div className="hide-scrollbar flex max-w-full gap-2 overflow-x-auto">
              {[
                ["all", "All"],
                ["watches", "Watches"],
                ["bags", "Bags"],
                ["jewelry", "Jewelry"],
                ["sneakers", "Sneakers"],
                ["fragrance", "Fragrance"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[9px] uppercase tracking-[.16em] transition ${
                    filter === value
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/55 hover:border-black/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liked={isWishlisted(product.id)}
                onLike={() => toggleWishlist(product.id)}
                onAdd={() => addToBag(product)}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/shop"
              className="flex items-center gap-5 rounded-full border border-black/15 px-7 py-3.5 text-[9px] uppercase tracking-[.2em] transition hover:bg-black hover:text-white"
            >
              Explore everything
              <ArrowRight size={14} strokeWidth={1.3} />
            </Link>
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section id="story" className="bg-[#101719] px-5 py-20 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid overflow-hidden rounded-[22px] bg-[#172326] lg:grid-cols-[1fr_1.15fr]">

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="text-[9px] uppercase tracking-[.3em] text-white/40">
                The PENG LUXE showroom
              </p>

              <h2 className="luxe-serif mt-5 text-5xl leading-[.95] tracking-[-.05em] md:text-6xl">
                See it.
                <br />
                Feel it.
                <br />
                Own it.
              </h2>

              <p className="mt-7 max-w-[390px] text-sm leading-6 text-white/55">
                Step inside a digital space designed around discovery. Explore
                every collection through a more immersive shopping experience.
              </p>

              <Link
                href="/shop"
                className="mt-8 flex w-fit items-center gap-6 rounded-full bg-white px-6 py-3.5 text-[9px] uppercase tracking-[.2em] text-black"
              >
                Enter showroom
                <ArrowRight size={14} strokeWidth={1.3} />
              </Link>
            </div>

            <div className="relative min-h-[440px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1600&q=90"
                alt="Luxury fashion showroom"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-7 left-7">
                <p className="text-[9px] uppercase tracking-[.25em] text-white/55">
                  Collection 01
                </p>

                <p className="luxe-serif mt-1 text-2xl">
                  Objects of desire
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="relative overflow-hidden bg-[#e9f0f1] px-5 py-24 md:px-8 lg:px-10">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#c7dfe4] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1100px] gap-10 text-center">
          <p className="text-[9px] uppercase tracking-[.35em] text-black/40">
            Defined by you
          </p>

          <h2 className="luxe-serif text-5xl leading-[.92] tracking-[-.055em] md:text-7xl lg:text-8xl">
            Luxury isn't
            <br />
            loud.
            <br />
            <span className="italic">It's personal.</span>
          </h2>

          <p className="mx-auto max-w-[530px] text-sm leading-6 text-black/55">
            Your style doesn't need an explanation. It only needs the right
            pieces. PENG LUXE brings together considered design, timeless
            materials and contemporary character.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-black/10 bg-white py-8">
        <div className="marquee flex w-max items-center">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex items-center whitespace-nowrap"
            >
              <span className="px-8 text-[12px] font-medium tracking-[.22em] text-black/45 md:px-12">
                {brand}
              </span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#f6f5f2] px-5 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] divide-y divide-black/10 border-y border-black/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            ["01", "Worldwide delivery", "Complimentary delivery on qualifying orders."],
            ["02", "Curated quality", "Every piece is selected with intention."],
            ["03", "Easy returns", "A simple 14-day return experience."],
            ["04", "Personal support", "Our concierge team is here when you need us."]
          ].map(([number, title, text]) => (
            <div key={title} className="px-5 py-7 md:px-7 md:py-2">
              <span className="text-[9px] text-black/30">{number}</span>
              <h3 className="mt-4 text-sm font-medium">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-black/45">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-black px-5 py-20 text-white md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-2 md:items-end">

          <div>
            <p className="text-[9px] uppercase tracking-[.3em] text-white/35">
              PENG LUXE private list
            </p>

            <h2 className="luxe-serif mt-4 max-w-[600px] text-5xl leading-[.95] tracking-[-.05em] md:text-6xl">
              Stay close to what's next.
            </h2>
          </div>

          <div>
            {subscribed ? (
              <div className="flex items-center gap-3 border-b border-white/20 pb-4 text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <Check size={14} strokeWidth={1.5} />
                </span>
                You're on the list.
              </div>
            ) : (
              <form onSubmit={submitNewsletter}>
                <div className="flex items-center border-b border-white/25 pb-4">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    placeholder="Your email address"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
                  />

                  <button
                    type="submit"
                    className="flex items-center gap-3 text-[9px] uppercase tracking-[.2em]"
                  >
                    Subscribe
                    <ArrowRight size={14} strokeWidth={1.3} />
                  </button>
                </div>

                <p className="mt-3 text-[9px] leading-5 text-white/30">
                  Receive occasional updates, private launches and editorial
                  stories from PENG LUXE.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] px-5 pb-8 pt-14 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-2xl font-semibold tracking-[-.07em]"
              >
                PENG<span className="font-light">LUXE</span>
              </Link>

              <p className="mt-5 max-w-[350px] text-xs leading-6 text-white/35">
                A contemporary destination for considered luxury, distinctive
                objects and timeless personal style.
              </p>

              <div className="mt-6 flex gap-2">
                {["IG", "X", "YT"].map((social) => (
                  <a
                    href="#"
                    key={social}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[9px] tracking-[.12em] transition hover:bg-white hover:text-black"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[.25em] text-white/30">
                Shop
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {["New In", "Watches", "Bags", "Jewelry", "Sneakers"].map(
                  (item) => (
                    <Link
                      href={
                        item === "New In"
                          ? "/shop?filter=new"
                          : `/shop?category=${item.toLowerCase()}`
                      }
                      key={item}
                      className="text-xs text-white/55 transition hover:text-white"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[.25em] text-white/30">
                Client services
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {[
                  "Contact us",
                  "Shipping & delivery",
                  "Returns",
                  "Care guide",
                  "Privacy"
                ].map((item) => (
                  <a
                    href="#"
                    key={item}
                    className="text-xs text-white/55 transition hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[8px] uppercase tracking-[.18em] text-white/25 md:flex-row">
            <span>© 2026 PENG LUXE. All rights reserved.</span>
            <span>Designed for the modern collector.</span>
          </div>
        </div>
      </footer>

      {/* FLOATING BAG */}
      {bagCount > 0 && (
        <Link
          href="/bag"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-black px-5 py-3.5 text-white shadow-2xl"
        >
          <ShoppingBag size={15} strokeWidth={1.3} />

          <span className="text-[9px] uppercase tracking-[.18em]">
            Bag · {bagCount}
          </span>
        </Link>
      )}
    </main>
  );
}
