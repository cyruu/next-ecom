import { Skeleton } from "@mui/material";
import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="detailcontainer h-full p-10 pr-20 flex  flex-col items-start flex-1 flex-wrap">
      <Skeleton
        variant="rectangular"
        height={50}
        className="w-full rounded-lg"
      />
      <Skeleton
        variant="rectangular"
        height={230}
        className="w-full rounded-lg mt-5"
      />
      <Skeleton
        variant="rectangular"
        height={50}
        className="w-full rounded-lg mt-5"
      />
      <Skeleton
        variant="rectangular"
        height={50}
        className="w-1/2 rounded-lg mt-5"
      />
    </div>
  );
};

export default ProductDetailSkeleton;
