"use client";

import React, { Suspense } from "react";
import Search from "@/components/pages/Search";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Search />
    </Suspense>
  );
}
