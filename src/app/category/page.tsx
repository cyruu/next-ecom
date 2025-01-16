"use client";

import React, { Suspense } from "react";
import Category from "@/components/pages/Category";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Category />
    </Suspense>
  );
}
