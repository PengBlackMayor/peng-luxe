"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  DollarSign,
  Users,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: string | number;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  email: string;
  total: string | number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [key, setKey] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setError("");

    try {
      const [productsResponse, ordersResponse] =
        await Promise.all([
          fetch("/api/admin/products", {
            headers: {
              "x-admin-key": key,
            },
          }),
          fetch("/api/admin/orders", {
            headers: {
              "x-admin-key": key,
            },
          }),
        ]);

      if (
        !productsResponse.ok ||
        !ordersResponse.ok
      ) {
        throw new Error("Invalid admin key");
      }

      setProducts(await productsResponse.json());
      setOrders(await ordersResponse.json());
      setLoaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard"
      );
    }
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-6">
        <div className="w-full max-w-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            PENG LUXE
          </p>

          <h1 className="mt-4 text-4xl font-light">
            Admin
          </h1>

          <p className="mt-4 text-sm text-black/50">
            Portfolio management dashboard.
          </p>

          <input
            type="password"
            placeholder="Admin API key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-8 w-full border border-black/15 bg-transparent px-4 py-4 text-sm outline-none focus:border-black"
          />

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={loadDashboard}
            className="mt-4 w-full bg-black py-4 text-[10px] uppercase tracking-[0.2em] text-white"
          >
            Enter dashboard
          </button>

          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black/50"
          >
            <ArrowLeft size={13} />
            Back to store
          </Link>
        </div>
      </main>
    );
  }

  const revenue = orders
    .filter((order) => order.paymentStatus === "PAID")
    .reduce(
      (sum, order) =>
        sum + Number(order.total),
      0
    );

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#111]">
      <header className="border-b border-black/10 px-6 py-5 md:px-12">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} />
          Storefront
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              PENG LUXE
            </p>

            <h1 className="mt-3 text-5xl font-light tracking-[-0.05em]">
              Dashboard
            </h1>
          </div>

          <span className="hidden text-xs text-black/40 sm:block">
            Portfolio Admin
          </span>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-black/10 p-6">
            <DollarSign size={18} />
            <p className="mt-6 text-xs text-black/40">
              Revenue
            </p>
            <p className="mt-2 text-2xl font-light">
              ${revenue.toLocaleString()}
            </p>
          </div>

          <div className="border border-black/10 p-6">
            <ShoppingBag size={18} />
            <p className="mt-6 text-xs text-black/40">
              Orders
            </p>
            <p className="mt-2 text-2xl font-light">
              {orders.length}
            </p>
          </div>

          <div className="border border-black/10 p-6">
            <Package size={18} />
            <p className="mt-6 text-xs text-black/40">
              Products
            </p>
            <p className="mt-2 text-2xl font-light">
              {products.length}
            </p>
          </div>

          <div className="border border-black/10 p-6">
            <Users size={18} />
            <p className="mt-6 text-xs text-black/40">
              Customers
            </p>
            <p className="mt-2 text-2xl font-light">
              {new Set(orders.map((o) => o.email)).size}
            </p>
          </div>
        </div>

        <div className="mt-14 border border-black/10">
          <div className="border-b border-black/10 p-6">
            <h2 className="text-xl font-light">
              Recent orders
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-10 text-sm text-black/40">
              No orders yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-black/10 text-xs text-black/40">
                  <tr>
                    <th className="p-5">Order</th>
                    <th className="p-5">Customer</th>
                    <th className="p-5">Total</th>
                    <th className="p-5">Payment</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-black/10 last:border-0"
                    >
                      <td className="p-5 font-mono text-xs">
                        {order.id.slice(-8)}
                      </td>

                      <td className="p-5">
                        {order.email}
                      </td>

                      <td className="p-5">
                        ${Number(order.total).toLocaleString()}
                      </td>

                      <td className="p-5 capitalize">
                        {order.paymentStatus.toLowerCase()}
                      </td>

                      <td className="p-5 capitalize">
                        {order.status.toLowerCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}