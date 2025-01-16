"use client";
import React, { useEffect, useState } from "react";
import { Card, OrderSummarySkeleton, SummaryCart } from "@/index";
import { Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderSummary = ({
  uid,
  checkoutCartList,
  total,
  VAT,
  finalTotal,
  loading,
}: any) => {
  const [cartListLoading, setcartListLoading] = useState(true);

  useEffect(() => {
    if (checkoutCartList.length > 0) {
      setcartListLoading(false);
    }
  }, [checkoutCartList]);
  return (
    <div className="w-[40%] h-max ml-14 bg-white px-10 pb-5 rounded-2xl shadow-md">
      {cartListLoading ? (
        <OrderSummarySkeleton />
      ) : (
        <>
          <p className="text-xl my-4 poppins mb-7">Order Summary</p>
          <div className="products-price">
            <div className="orderproducts">
              {checkoutCartList.map((eachProduct: any) => (
                <SummaryCart key={eachProduct._id} product={eachProduct} />
              ))}
            </div>
            <div className="pricing w-[95%] " style={{ fontSize: ".85rem" }}>
              <div className="subtotal mb-3 w-full flex justify-between poppins">
                <p className="poppins">Subtotal</p>
                <p className="">Rs. {total}</p>
              </div>

              <div className="Shipping mb-3 w-full flex justify-between poppins">
                <p className="poppins">VAT estimate (13%)</p>
                <p className="">Rs. {VAT}</p>
              </div>
              <Divider sx={{ marginBlock: "1rem" }} />
              <div className="total  w-full flex justify-between poppins">
                <p className="font-light text-lg ">Order Total</p>
                <p className="font-bold" style={{ fontSize: "1rem" }}>
                  Rs. {finalTotal}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
