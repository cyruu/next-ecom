"use client";
import React, { useEffect } from "react";
import { ProductForm, SideMenu } from "@/index";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { removeSidebar } from "@/helper/removeSidebar";
const page = () => {
  useEffect(() => {
    removeSidebar();
  }, []);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <ProductForm />
    </div>
  );
};

export default page;
