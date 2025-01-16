import { Skeleton } from "@mui/material";
import React from "react";

const ContactInfoSkeleton = () => {
  return (
    <div className="  ">
      {/* first */}
      <div className="flex items-center justify-between my-7">
        <Skeleton variant="rounded" height={20} width={400} />
        <Skeleton variant="rounded" height={20} width={250} />
      </div>
      {/* second */}
      <div className="flex mt-14 justify-between">
        <Skeleton variant="rounded" height={40} width={350} />
        <Skeleton variant="rounded" height={40} width={350} />
      </div>
      {/* third */}
      <Skeleton variant="rounded" height={40} className="w-full mt-10" />
      <Skeleton variant="rounded" height={40} className="w-full mt-14" />
      <Skeleton variant="rounded" height={40} className="w-full mt-14" />
      {/* forth */}
      <div className="flex mt-8 justify-between">
        <Skeleton variant="rounded" height={40} width={350} />
        <Skeleton variant="rounded" height={40} width={350} />
      </div>
      {/* fifth */}
      <Skeleton variant="rounded" height={40} className="w-full mt-6" />
    </div>
  );
};

export default ContactInfoSkeleton;
