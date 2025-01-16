"use client";

import React, { Suspense } from "react";
import Order from "@/components/pages/Order";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Order />
    </Suspense>
  );
}
