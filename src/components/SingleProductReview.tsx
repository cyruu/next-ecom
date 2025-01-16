import { Avatar } from "@mui/material";
import React from "react";

const SingleProductReview = (reviewEach: any) => {
  // console.log(reviewEach.reviewEach.review);
  const { reviewEach: revieweach } = reviewEach;
  const dateOnly = revieweach.createdAt.split("T")[0];
  // console.log(dateOnly); // Output: "2024-11-13"

  // console.log(revieweach);

  return (
    <div className="mb-5">
      <div className="avatar-name flex items-center ">
        <Avatar className="h-[30px] w-[30px] mr-3">
          {revieweach.userName ? revieweach.userName[0].toUpperCase() : ""}
        </Avatar>
        <p className="mr-2 text-sm font-bold poppins">{revieweach.userName}</p>
        <p className="text-xs text-gray-500 poppins">at {dateOnly}</p>
        {/* <span
          className={`h-[10px] w-[10px] rounded-full poppins ${
            revieweach.sentiment === "positive"
              ? "bg-green-400"
              : revieweach.sentiment === "negative"
              ? "bg-red-400"
              : revieweach.sentiment === "neutral"
              ? "bg-gray-400"
              : "bg-gray-200" // fallback color if sentiment is not matched
          } ml-2`}
        ></span> */}
      </div>
      <div className="review-content ml-10 text-sm text-gray-500 poppins">
        {revieweach.review}
      </div>
    </div>
  );
};

export default SingleProductReview;
