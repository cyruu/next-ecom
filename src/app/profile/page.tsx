"use client";

import React, { Suspense } from "react";
import Profile from "@/components/pages/Profile";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <Profile />
    </Suspense>
  );
}
