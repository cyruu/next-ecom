"use client";
import React from "react";
import Divider from "@mui/material/Divider";
import { notify, Plusminus } from "@/index";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { log } from "console";
import { ToastContainer } from "react-toastify";
const Cartitem = ({
  product,
  uid,
  setcartList,
  setCartItemUpdated,
  setquantityChange,
  setupdatedCartList,
  cartList,
}: any) => {
  //get userid
  // console.log("product from cart db", product);

  const router = useRouter();

  // console.log(product);
  //fucntion
  async function handleDelete() {
    console.log(product);
    const { data: resData }: any = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/deletefromcart`,
      {
        product,
        uid,
      }
    );
    // console.log(resData);

    notify(resData.msg, resData.statusCode);

    if (resData.statusCode == 200) {
      setTimeout(() => {
        setCartItemUpdated((prev: any) => !prev);
        const deleteUpadatedCartList = cartList.filter(
          (item: any) => item._id !== uid
        );
        setcartList(deleteUpadatedCartList);
      }, 0);
    }
  }

  return (
    <div className="w-[90%] mx-[5%]">
      <div className="flex">
        <div className="bg-gray-300 rounded-[10%] ">
          <img
            src={product.image}
            alt=""
            className="h-[150px] w-[150px] object-contain mix-blend-multiply rounded-[10%]  hover:scale-105 transition duration-75"
          />
        </div>
        <div className="ml-[50px] mt-[10px] relative w-[70%]">
          <p className="text-[1.2rem] font-light">{product.productName}</p>
          <h1 className="mt-[5px] poppins font-medium ">Rs. {product.price}</h1>
          <div className="absolute top-[65px] left-[100px]">
            <Plusminus
              quan={product.quantity}
              cartId={product._id}
              stock={product.stock}
              uid={uid}
              setquantityChange={setquantityChange}
              setupdatedCartList={setupdatedCartList}
              cartList={cartList}
            />
          </div>
          <p className="absolute poppins text-light w-max top-[110px] font-light bg-gray-400 px-2 py-1 text-xs rounded-xl text-white">
            {/* <DoneIcon
              sx={{ color: "green", fontSize: "1.4rem", marginRight: "5px" }}
            /> */}
            In stock : {product.stock}
          </p>
          <CloseIcon
            onClick={handleDelete}
            className="text-[1.2rem] absolute top-[5px] right-[20px] cursor-pointer hover:rotate-90 hover:scale-150 hover:text-red-600 transition duration-150"
          />
        </div>
      </div>
      <Divider sx={{ margin: "20px" }} />
    </div>
  );
};

export default Cartitem;
