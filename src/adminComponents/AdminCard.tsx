"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminCard = ({ product }: any) => {
  const pid = product._id;

  return (
    <div className="w-[250px] p-3 h-[300px]  bg-white cursor-pointer rounded-lg hover:shadow-md transition-all ease duration-300 ">
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
  );
};

export default AdminCard;
