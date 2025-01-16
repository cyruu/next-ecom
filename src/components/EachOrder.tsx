"use client";
import React, { forwardRef, useEffect } from "react";
import EachOrderProduct from "./EachOrderProduct";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const EachOrder = forwardRef<any, { item: any }>(
  ({ item }: any, orderRef: any) => {
    const dateOnly = item.createdAt.split("T")[0];
    function handleShowOrderProducts() {
      if (orderRef) {
        const orderCartItems =
          orderRef.current.querySelector(".order-cart-items");
        const arrowicon = orderRef.current.querySelector(".downarrow");
        //toggle hidden class

        orderCartItems.classList.toggle("show");
        arrowicon.classList.toggle("rotatearrow");
      }
    }

    return (
      <div
        className="border rounded-lg h-max px-5 pt-5 mb-5 flex flex-col w-full bg-white shadow-sm cursor-pointer"
        ref={orderRef}
        onClick={handleShowOrderProducts}
      >
        <div className="order-details w-full grid grid-cols-7 ">
          <div className="name-email ">
            <p className="text-sm font-medium poppins">{`${item.firstName} ${item.lastName}`}</p>
            <p className="text-xs text-gray-500 poppins">{item.email}</p>
            <p className="text-xs mt-2 poppins">Date : {dateOnly}</p>
          </div>
          <p className="text-sm poppins">{item.phone}</p>
          <p className="text-sm poppins">{item.address}</p>
          <p className="text-sm poppins">{item.city}</p>
          <p className="text-sm poppins">{item.country}</p>
          <p className="text-sm poppins">{item.paymentmethod.toUpperCase()}</p>
          <div className="price-btn  flex justify-between">
            <p className="text-lg  font-medium poppins">Rs. {item.total}</p>
            <KeyboardArrowDownIcon className="downarrow transition-all ease-in" />
          </div>
        </div>
        <div className="order-cart-items grid grid-cols-6 items-center mt-5">
          {item.orderitems.map((item: any) => (
            <EachOrderProduct item={item} key={item._id} />
          ))}
        </div>
      </div>
    );
  }
);

export default EachOrder;
