"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Plusminus = ({
  quan,
  stock,
  cartId,
  setquantityChange,
  setupdatedCartList,
  uid,
  cartList,
}: any) => {
  const [quantity, setQuantity] = useState(quan);
  // console.log("cart id for quantity ", cartId);

  function ChangeQuantity(operation: String) {
    return () => {
      if (operation == "inc") {
        // if (quantity != 10) {
        // setQuantity(quantity + 1);
        setQuantity(Math.min(quantity + 1, 10));
        // }
      } else if (operation == "dec") {
        setQuantity(Math.max(quantity - 1, 1));
      }
      setquantityChange((previous: any) => !previous);
      // console.log("quantity in plusminus", quantity);
    };
  }
  async function apiCallforQuantity() {
    const { data: resData }: any = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/updatequantity`,
      {
        cartId,
        quantity,
        uid,
      }
    );
  }
  function updateCartList() {
    const newUpdatedCartList = cartList.map((cartItem: any) => {
      if (cartItem._id !== cartId) {
        return cartItem;
      } else {
        const updatedCartItem = { ...cartItem, quantity: quantity };
        return updatedCartItem;
      }
    });
    // console.log("updated", newUpdatedCartList);

    setupdatedCartList(newUpdatedCartList);
  }
  useEffect(() => {
    const time = setTimeout(() => {
      console.log("update quantity");
      apiCallforQuantity();
    }, 1000);
    // for front end ?
    updateCartList();
    return () => {
      clearTimeout(time);
    };
  }, [quantity]);
  // const decreaseQuantity = () => {
  //   setQuantity(Math.max(quantity - 1, 1));
  // };
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center w-max space-x-2 bg-gray-50 border hover:bg-gray-100  rounded ">
        <button
          onClick={ChangeQuantity("dec")}
          className="hover:bg-gray-200 text-gray-500 rounded px-3 py-1"
        >
          -
        </button>
        <span className="text-l text-gray-600 poppins">{quantity}</span>
        <button
          onClick={ChangeQuantity("inc")}
          className="hover:bg-gray-200 text-gray-500 rounded px-3 py-1"
        >
          +
        </button>
      </div>
      {quantity > stock ? (
        <p className="text-xs text-red-400 mt-4 font-medium poppins">
          Quantity Exceeded
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Plusminus;
