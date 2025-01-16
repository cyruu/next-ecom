import { Skeleton } from "@mui/material";
import React from "react";

const ReviewSkeleton = () => {
  return (
    <div className="flex flex-col mb-5">
      <div className="avatar-username flex items-center">
        <Skeleton variant="circular" height={35} width={35} className="mr-2" />
        <Skeleton
          variant="rectangular"
          height={10}
          width={150}
          className="rounded-lg"
        />
      </div>
      <Skeleton
        variant="rectangular"
        height={15}
        width={400}
        className="rounded-full ml-10"
      />
    </div>
  );
};

export default ReviewSkeleton;
