"use client";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import checkmark from "@/images/check_mark.png";
import esewa from "@/images/esewa.png";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
const EsewaPaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const query = useSearchParams();
  const dataQuery: any = query?.get("data");
  const [decodedData, setDecodedData] = useState<any>({});
  // updatePaymentStatus
  async function updatePaymentStatus(orderId: any) {
    const { data: resData } = await axios.post("api/updatepaymentstatus", {
      orderId,
    });
    console.log(resData);
  }
  // delete items from cart
  async function deleteCartItems(orderId: any) {
    const { data: resData } = await axios.post("api/deletecartitems", {
      orderId,
    });
    console.log(resData);
  }
  // initial useEffect
  useEffect(() => {
    setLoading(true);
    let decodedData: any = atob(dataQuery);
    decodedData = JSON.parse(decodedData);
    console.log("decoded data", decodedData);

    if (decodedData.status == "COMPLETE") {
      const transaction_uuid = decodedData.transaction_uuid;
      // set paymentStatus to complete for the order created as transaction_uuid
      deleteCartItems(transaction_uuid);
      updatePaymentStatus(transaction_uuid);
    } else {
      console.log("payment failed");
    }

    setDecodedData(decodedData);
    setLoading(false);
  }, [dataQuery]);

  return (
    <div className="min-h-[90vh] flex justify-center">
      {loading ? (
        <div className="loading-container my-auto text-center">
          <CircularProgress color="success" size={70} />
          <p className="text-gray-500 text-xl mt-3">Processing Payment</p>
        </div>
      ) : (
        <div className="display-container flex flex-col items-center mt-20">
          <Image src={checkmark} alt="checkmark" height={250} />
          <p className="text-3xl text-green-400">Payment Successfull !</p>
          <div className="amount-container w-full mt-5 mb-9">
            <div className="grid grid-cols-2 text-md mb-1">
              <p>Total Amount</p>
              <p className="ml-auto text-green-400 font-bold">
                Rs. {decodedData.total_amount}
              </p>
            </div>
            <div className="grid grid-cols-2 text-md">
              <p>Paid via</p>
              <div className="ml-auto flex">
                <Image src={esewa} alt="esewa" height={20} width={25} />
                <p className="ml-1">E-sewa</p>
              </div>
            </div>
          </div>
          <Link href="/" className="w-full">
            <Button variant="contained" color="success" className="w-full">
              Shop More
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EsewaPaymentSuccess;
