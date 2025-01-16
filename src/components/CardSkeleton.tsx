import { Skeleton } from "@mui/material";
import React from "react";

const CardSkeleton = () => {
  return (
    <div className=" ml-2 mt-2 mr-2 w-[230px] h-[250px] flex flex-col justify-center">
      <Skeleton
        variant="rectangular"
        width={230}
        height={230}
        className="rounded-md"
      />
      <div className="flex justify-between mt-2">
        <Skeleton width={100} height={20} />
        <Skeleton width={70} height={20} />
      </div>
    </div>
  );
};

export default CardSkeleton;
