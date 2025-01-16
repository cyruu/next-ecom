"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Card = ({ product }: any) => {
  const pid = product._id;
  // const router = useRouter();

  // const handleClick = () => {
  //   // console.log(product);

  //   // Save the product data as a string in sessionStorage
  //   sessionStorage.setItem("productSent", JSON.stringify(product));

  //   router.push("/productPage");
  // };
  return (
    <Link href={`/productPage/${pid}`}>
      <div
        // onClick={handleClick}
        className="w-[250px] p-3 h-max  bg-white cursor-pointer rounded-lg hover:shadow-md transition-all ease duration-300 "
      >
        {/* image container */}
        <div className="imageContainer bg-gray-200 rounded-lg  overflow-hidden w-full ">
          <img
            className="w-[200px] h-[220px] m-auto object-contain mix-blend-multiply filter "
            src={product.image}
            alt={product.productName}
          />
        </div>
        {/* product name price */}
        <div className="details mt-3 flex justify-between items-start w-full poppin text-sm">
          <p className="font-light">{product.productName}</p>
          <p className=" w-[75px] flex justify-end">Rs. {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
