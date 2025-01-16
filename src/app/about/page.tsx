"use client";
import React, { useState } from "react";
import Link from "next/link";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
const page = () => {
  const [a, usea] = useState(10);
  return (
    <div>
      <Header />
      <About />
      <br />
      <br />
      <Link href="">HOme</Link>
      <p>Vlaue of a :{a}</p>
      <button
        onClick={() => {
          usea(a + 1);
        }}
      >
        increase
      </button>
    </div>
  );
};

export default page;
