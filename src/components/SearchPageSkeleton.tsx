import React from "react";
import { CardSkeleton } from "@/index";

const SearchPageSkeleton = () => {
  return (
    <div className="w-[75vw] ml-14 mt-14 min-h-[50vh] grid grid-cols-4 gap-10">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default SearchPageSkeleton;
