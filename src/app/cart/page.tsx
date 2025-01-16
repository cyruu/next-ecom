"use client";

import React, { Suspense } from "react";
import Cart from "@/components/pages/Cart";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Cart />
    </Suspense>
  );
}
