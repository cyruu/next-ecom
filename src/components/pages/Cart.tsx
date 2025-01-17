"use client";
import React, { useEffect, useState } from "react";
import { Cartitem, Cartbill, CartProductSkeleton } from "@/index";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Divider, Skeleton } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const router = useRouter();
  const [quantityChange, setquantityChange] = useState(true);
  const [cartItemUpdated, setCartItemUpdated] = useState(true);
  const [loading, setLoading] = useState(true);
  const [checkoutValid, setcheckoutValid] = useState(false);
  const [cartList, setcartList] = useState<any[]>([]); // Ensure cartList is always an array
  const [updatedCartList, setupdatedCartList] = useState<any[]>([]); // Ensure updatedCartList is always an array
  const search = useSearchParams();
  const uid = search ? search.get("uid") : null;

  async function pullCartItems() {
    setLoading(true);
    try {
      const { data: resData }: any = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/getcartitems`,
        {
          msg: "sending user id",
          userId: uid,
        }
      );
      setcartList(resData.cartItemsList || []); // Ensure cartItemsList is valid
      setupdatedCartList(resData.cartItemsList || []);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setcartList([]);
      setupdatedCartList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    pullCartItems();
  }, [cartItemUpdated]);

  useEffect(() => {
    let booleanArray: boolean[] = [];
    updatedCartList.forEach((cartitem: any) => {
      // Check if the quantity is valid
      if (cartitem.stock < cartitem.quantity) {
        booleanArray.push(false);
      } else {
        booleanArray.push(true);
      }
    });
    // Check if any quantity is invalid
    setcheckoutValid(!booleanArray.includes(false));
  }, [updatedCartList]);

  return (
    <>
      <div className="w-4/5 mx-auto mb-24 mt-[50px] h-auto p-[10px] bg-white shadow-md font-semibold rounded-[10px]">
        <ToastContainer />
        <div>
          <p className="text-[1.8rem] font-normal ml-10 pt-[20px] poppins">
            Shopping Cart
          </p>
          <Divider sx={{ margin: "20px" }} />
        </div>
        {loading ? (
          <>
            <div className="flex">
              <div className="flex flex-col">
                <CartProductSkeleton />
                <CartProductSkeleton />
              </div>
              <div className="summary-skeleton ml-16 ">
                <Skeleton variant="rounded" height={30} width={300} />
                <Skeleton
                  variant="rounded"
                  height={130}
                  width={300}
                  className="mt-3"
                />
                <Divider sx={{ margin: ".8rem 0" }} />
                <Skeleton
                  variant="rounded"
                  height={30}
                  width={300}
                  className="mt-2 "
                />
              </div>
            </div>
          </>
        ) : cartList.length > 0 ? (
          <div className="flex">
            <div id="items" className="w-[60%]">
              {cartList.map((cartItem: any) => (
                <Cartitem
                  key={cartItem._id}
                  product={cartItem}
                  cartList={cartList}
                  uid={uid}
                  setcartList={setcartList}
                  setCartItemUpdated={setCartItemUpdated}
                  setquantityChange={setquantityChange}
                  setupdatedCartList={setupdatedCartList}
                />
              ))}
            </div>
            <div id="bill" className="w-[40%] h-[400px]">
              <Cartbill
                items={updatedCartList}
                quantityChange={quantityChange}
                uid={uid}
                checkoutValid={checkoutValid}
              />
            </div>
          </div>
        ) : (
          <div className="p-28 text-xl">
            <p className="poppins text-[2rem] font-extralight">
              NO ITEMS IN CART!
            </p>
            <Link href="/">
              <Button
                variant="contained"
                type="submit"
                className="mt-7 bg-gray-500 text-white"
              >
                Add Products
                <AddShoppingCartOutlinedIcon sx={{ fontSize: "1.1rem" }} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
