"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/data/products";

type BagItem = Product & {
  quantity: number;
};

type StoreContextType = {
  bag: BagItem[];
  wishlist: string[];
  addToBag: (product: Product) => void;
  removeFromBag: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearBag: () => void;
  bagCount: number;
  bagTotal: number;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedBag = localStorage.getItem("peng-luxe-bag");
      const savedWishlist = localStorage.getItem("peng-luxe-wishlist");

      if (savedBag) setBag(JSON.parse(savedBag));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      localStorage.removeItem("peng-luxe-bag");
      localStorage.removeItem("peng-luxe-wishlist");
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("peng-luxe-bag", JSON.stringify(bag));
    }
  }, [bag, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("peng-luxe-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, ready]);

  const addToBag = (product: Product) => {
    setBag((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromBag = (id: string) => {
    setBag((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(id);
      return;
    }

    setBag((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const clearBag = () => setBag([]);

  const bagCount = useMemo(
    () => bag.reduce((sum, item) => sum + item.quantity, 0),
    [bag]
  );

  const bagTotal = useMemo(
    () => bag.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [bag]
  );

  return (
    <StoreContext.Provider
      value={{
        bag,
        wishlist,
        addToBag,
        removeFromBag,
        updateQuantity,
        toggleWishlist,
        isWishlisted,
        clearBag,
        bagCount,
        bagTotal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}
