"use client";

import React, { Suspense } from "react";
import Checkout from "@/components/pages/Checkout";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Checkout />
    </Suspense>
  );
}
