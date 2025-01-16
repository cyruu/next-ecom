"use client";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
const page = () => {
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="display-container flex flex-col items-center ">
        <ErrorOutlineIcon className="text-7xl text-red-600" />
        <p className="mb-5 text-xl text-gray-500">Payment Failed </p>
        <p>
          Go to
          <Link href="/" className="w-full underline text-blue-400 ml-2">
            Home page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
//hello
