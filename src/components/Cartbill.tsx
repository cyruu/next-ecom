import React, { useEffect, useState } from "react";
import { Divider, Button } from "@mui/material";
import Link from "next/link";
const Cartbill = ({ items, quantityChange, checkoutValid, uid }: any) => {
  const [total, settotal] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [finalTotal, setfinalTotal] = useState(0);

  // console.log("in cartBill", items);
  useEffect(() => {
    let subtotal = 0;
    items.map((eachItem: any) => {
      subtotal += eachItem.quantity * eachItem.price;
      settotal(subtotal);
    });
    let tempVAT = (13 / 100) * subtotal;
    setVAT(Math.floor(tempVAT));
    setfinalTotal(Math.floor(subtotal + tempVAT));
  }, [items]);
  return (
    <div className="px-7 w-[420px] ml-[30px] rounded-xl font-light text-[0.9rem]">
      <p className="poppins font-normal mb-[15px] text-[1.1rem]">
        Order Summary
      </p>
      <div className="flex justify-between">
        <p className="poppins">Subtotal</p>
        <p className="poppins">Rs. {total}</p>
      </div>

      <div className="flex justify-between mt-4">
        <p className="poppins">VAT estimate (13%)</p>
        <p className="poppins">Rs. {VAT}</p>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between font-normal mt-4">
        <p className=" poppins text-md">Order total</p>
        <p className="poppins text-lg">Rs. {finalTotal}</p>
      </div>
      {checkoutValid ? (
        <Link href={`/checkout?uid=${uid}`}>
          <Button variant="contained" className="w-full mt-6">
            Checkout
          </Button>
        </Link>
      ) : (
        <Button variant="contained" disabled className="w-full mt-6">
          Checkout
        </Button>
      )}
    </div>
  );
};

export default Cartbill;
