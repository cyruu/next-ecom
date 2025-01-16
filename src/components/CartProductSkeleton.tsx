import { Skeleton } from "@mui/material";
import React from "react";

const CartProductSkeleton = () => {
  return (
    <div className="px-5 flex mb-10">
      <Skeleton
        variant="rectangular"
        height={150}
        width={150}
        className="rounded-xl mr-5"
      />
      <div className="details flex flex-col">
        <Skeleton
          variant="rectangular"
          height={20}
          width={500}
          className="rounded-md mb-3"
        />
        <Skeleton
          variant="rectangular"
          height={115}
          width={500}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default CartProductSkeleton;
