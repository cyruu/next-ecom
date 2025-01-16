"use client";
import React, { useEffect } from "react";
import { removeSidebar, ProductDescription } from "@/index";
import AdminProduct from "@/components/ProductForm";
import ProductForm from "@/components/ProductForm";
const page = () => {
  useEffect(() => {
    removeSidebar();
  }, []);
  return (
    <div>
      <ProductDescription />
      <ProductForm />
    </div>
  );
};

export default page;
