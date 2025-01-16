"use client";

import React, { Suspense } from "react";
import EsewaPaymentSuccess from "@/components/pages/EsewaPaymentSuccess";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <EsewaPaymentSuccess />
    </Suspense>
  );
}
