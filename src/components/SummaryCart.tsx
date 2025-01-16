import React from "react";
import Divider from "@mui/material/Divider";
import { Plusminus } from "@/index";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const SummaryCart = ({ product }: any) => {
  return (
    <div className="w-full poppins">
      <div className="flex">
        <div className="mr-5 bg-gray-300 rounded-[10%]">
          <img
            src={product.image}
            alt={product.productName}
            className="h-[70px] w-[70px] object-contain mix-blend-multiply rounded-[10%]"
          />
        </div>
        <div className="w-[70%] text-md flex flex-col">
          <p className="font-light poppins">{product.productName}</p>
          <div className="eachprice-total flex justify-between ">
            <p className="font-medium text-xs poppins">Rs. {product.price}</p>
            <div className="quantity-total flex flex-col">
              <p className="text-xs poppins">
                Quantity: <b>{product.quantity}</b>
              </p>
              <p className="text-xs poppins">
                Total:{" "}
                <b className="">Rs. {product.price * product.quantity}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "20px 0" }} />
    </div>
  );
};

export default SummaryCart;
