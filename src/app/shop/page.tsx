import { Suspense } from "react";

import ShopClient from "@/components/ShopClient";

function ShopPageContent() {
  return <ShopClient />;
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f6f5f2] flex items-center justify-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-black/40">
            Loading collection...
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
