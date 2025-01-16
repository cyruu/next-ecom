import { Skeleton } from "@mui/material";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div>
      {/* first */}
      <div className="profile-first w-full  flex items-center justify-between">
        <div className="pic-name flex items-center">
          <Skeleton variant="circular" height={100} width={100} />
          <div className="name-email ml-4 ">
            <Skeleton variant="rounded" height={20} width={400} />
            <Skeleton
              variant="rounded"
              height={15}
              width={300}
              className="mt-2"
            />
          </div>
        </div>
        <Skeleton variant="rounded" height={40} width={100} />
      </div>
      {/* second */}
      <div className="form-container mt-16">
        <form className="grid grid-cols-2 gap-7">
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
          <Skeleton
            variant="rounded"
            width={550}
            height={30}
            className="mb-8"
          />
        </form>
      </div>
      <Skeleton variant="rounded" height={40} width={140} className="mt-12" />
    </div>
  );
};

export default ProfileSkeleton;
