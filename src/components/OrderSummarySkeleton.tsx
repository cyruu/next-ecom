import { Divider, Skeleton } from "@mui/material";
import React from "react";

const OrderSummarySkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" height={25} className="my-4 mb-7 w-full" />
      <Skeleton variant="rounded" height={90} className=" w-full mb-4" />
      <Skeleton variant="rounded" height={90} className=" w-full mb-4" />
      <Skeleton variant="rounded" height={90} className=" w-full mb-4" />
      <Divider sx={{ margin: "1rem 0" }} />
      <Skeleton variant="rounded" height={20} className=" w-full mb-7" />
      <Skeleton variant="rounded" height={20} className=" w-full mb-7" />
      <Divider sx={{ margin: "1rem 0" }} />
      <Skeleton variant="rounded" height={20} className=" w-full mb-4" />
    </div>
  );
};

export default OrderSummarySkeleton;
