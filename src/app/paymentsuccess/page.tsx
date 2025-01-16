"use client";

import React, { Suspense } from "react";
import PaymentSuccess from "@/components/pages/PaymentSuccess";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
