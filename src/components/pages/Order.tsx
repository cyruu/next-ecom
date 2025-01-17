"use client";
import EachOrder from "@/components/EachOrder";
import { OrderListSkeleton, removeSidebar } from "@/index";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { createRef, useEffect, useRef, useState } from "react";

const Order = () => {
  const [orderlist, setorderlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const orderRefs = useRef<any>({});
  const search = useSearchParams();
  const uid = search ? search.get("uid") : null;
  console.log(uid);
  async function getOrder() {
    setLoading(true);
    const { data: resData }: any = await axios.post("api/getorder", { uid });
    // console.log("sas", resData);
    // console.log("hello", resData.OrderList);
    let completePaymentOrderList = resData.OrderList.filter(
      (order: any) => order.paymentStatus == "complete"
    );
    setorderlist(completePaymentOrderList);
    setLoading(false);
  }
  useEffect(() => {
    getOrder();
    removeSidebar();
  }, []);

  return (
    <div className="px-32 my-10 min-h-[90vh]">
      <div className="border rounded-lg h-max p-5 mb-5 flex w-full bg-white shadow-sm">
        <div className="order-details w-full grid grid-cols-7 text-sm font-bold ">
          <p className="poppins">Full Name</p>
          <p className="poppins">Phone no.</p>
          <p className="poppins">Address</p>
          <p className="poppins">City</p>
          <p className="poppins">Country</p>
          <p className="poppins">Method</p>
          <p className="poppins">Total</p>
        </div>
      </div>
      {loading ? (
        <OrderListSkeleton />
      ) : orderlist.length == 0 ? (
        <div className="border rounded-lg h-max p-5 mb-5 flex justify-center items-center w-full bg-white shadow-sm">
          <p className="text-lg font-light poppins">No orders yet !</p>
          <Link href="/" className="ml-2 underline text-blue-500">
            Shop now
          </Link>
        </div>
      ) : (
        orderlist.map((eachItem: any) => (
          <EachOrder
            item={eachItem}
            key={eachItem._id}
            ref={
              orderRefs.current[eachItem._id]
                ? orderRefs.current[eachItem._id]
                : (orderRefs.current[eachItem._id] = createRef())
            }
          />
        ))
      )}
    </div>
  );
};

export default Order;
