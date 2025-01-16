import { Skeleton } from "@mui/material";
import React from "react";

const OrderListSkeleton = () => {
  return (
    <div className="">
      <Skeleton variant="rounded" height={100} className="w-full mb-5" />
      <Skeleton variant="rounded" height={100} className="w-full mb-5" />
      <Skeleton variant="rounded" height={100} className="w-full mb-5" />
      <Skeleton variant="rounded" height={100} className="w-full mb-5" />
    </div>
  );
};

export default OrderListSkeleton;
