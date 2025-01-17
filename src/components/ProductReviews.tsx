"use client";
import React, { useEffect, useRef, useState } from "react";
import { notify, SingleProductReview, ReviewSkeleton } from "@/index";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ProductReviews = ({
  productReviews = [], // Default to an empty array if undefined
  loading,
  pId,
  setReviewUpdated,
}: any) => {
  const [showCount, setShowCount] = useState(3);
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  const userid = loggedInUser?.userId;
  const [postingLoading, setPostingLoading] = useState(false);
  const [sentiment, setSentiment] = useState("neutral");
  const { register, handleSubmit, formState, reset } = useForm<any>();
  const { errors } = formState;

  // Function to handle posting review
  async function handlePostReview(review: string) {
    // const { data: resData } = await axios.post(
    //   "http://localhost:8001/calcsentiment",
    //   { sentence: review }
    // );
    // const sentimentResult = resData.sentiment;
    const sentimentResult = "positive";

    // API to add review
    const { data: reviewData } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}api/products/addreview`,
      {
        sentimentResult,
        loggedInUser,
        userId: loggedInUser.userId,
        userName: loggedInUser.username,
        review,
        pId,
      }
    );
    setSentiment(sentimentResult);
    setReviewUpdated((prev: any) => !prev);
    handleOpen();
  }

  // Submit function
  async function submit(data: any) {
    const { review } = data;
    if (review.trim() === "") {
      return false;
    }
    setPostingLoading(true);
    await handlePostReview(review);
    reset();
    setPostingLoading(false);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="bg-white shadow-md w-full mx-auto px-10 py-5 mb-10 rounded-lg">
      {/* Modal */}
      <Modal
        className="flex items-center justify-center outline-none"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            background: "white",
            height: "max-content",
            width: "30vw",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <div className="text-center">
            <CheckCircleIcon
              className={`text-9xl ${
                sentiment === "positive"
                  ? "text-green-400"
                  : sentiment === "negative"
                  ? "text-red-400"
                  : sentiment === "neutral"
                  ? "text-gray-400"
                  : "text-gray-400"
              } `}
            />
            <p className="text-3xl font-bold mt-2 poppins text-gray-700">
              Review posted
            </p>
          </div>
          <p className="text-md text-center my-7 text-gray-500">
            {/* {sentiment === "positive" ? (
              <span>
                Thank you for your positive review! Hope to see you shop with us
                again.
              </span>
            ) : sentiment === "negative" ? (
              <span>
                We&apos;re sorry to hear this. Thank you for letting us know.
                We&apos;ll work on improving.
              </span>
            ) : sentiment === "neutral" ? (
              <span>
                Thank you for your feedback! We&apos;re always working to make
                products better.
              </span>
            ) : (
              <span>
                Thank you for your feedback! We&apos;re always working to make
                products better.
              </span>
            )} */}
            <span>
              Thank you for your feedback! We&apos;re always working to make
              products better.
            </span>
          </p>
          <div className="button text-center">
            <Button
              onClick={handleClose}
              variant="contained"
              className="bg-gray-400 mt-2 w-full text-lg"
              disableElevation
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Modal End */}

      <p className="mb-5 text-2xl flex items-center poppins">
        Reviews
        <span className="bg-gray-400 px-1.5 poppins rounded-md py-0.5 ml-3 text-white text-sm">
          {productReviews.length}
        </span>
      </p>

      {/* Add a review */}
      <form
        className="addreview flex items-start mb-7"
        onSubmit={handleSubmit(submit)}
      >
        <Avatar className="mr-3">
          {loggedInUser ? loggedInUser.username[0].toUpperCase() : ""}
        </Avatar>
        <div className="flex-1">
          <TextField
            autoComplete="off"
            variant="standard"
            placeholder="Add a review..."
            className="w-full poppins"
            {...register("review", {
              required: {
                value: true,
                message: "* Cannot be Empty",
              },
            })}
          />
          <p className="mr-auto text-xs m-0 text-red-700 mt-1">
            {errors.review && String(errors.review.message)}
          </p>
        </div>
        {loggedInUser ? (
          postingLoading ? (
            <LoadingButton
              className="ml-4 px-5"
              variant="contained"
              disabled
              loading={postingLoading}
              loadingPosition="end"
            >
              <span className="mr-5">Posting</span>
            </LoadingButton>
          ) : (
            <Button className="ml-4 px-5" variant="contained" type="submit">
              Post
              <SendIcon className="text-sm ml-2" />
            </Button>
          )
        ) : (
          <Link href="/login">
            <Button className="ml-4 px-5" variant="contained">
              Post
              <SendIcon className="text-sm ml-2" />
            </Button>
          </Link>
        )}
      </form>

      {loading ? (
        <>
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
        </>
      ) : productReviews.length === 0 ? (
        <p className="text-gray-500 ml-12 poppins">
          <RateReviewIcon className="mr-2 text-gray-400" />
          Be the first person to review this product.
        </p>
      ) : (
        ""
      )}

      <div className="reviews-container fixed-scrollbar flex flex-col overflow-y-auto">
        {productReviews.slice(0, showCount).map((review: any) => {
          return <SingleProductReview key={review._id} reviewEach={review} />;
        })}
      </div>

      {productReviews.length < 4 ? (
        ""
      ) : (
        <div className="buttons mt-5 w-full flex items-center justify-center">
          {/* Show More or Show Less */}
          {showCount >= productReviews.length ? (
            <Button
              onClick={() => setShowCount(3)}
              className="w-max text-gray-500"
            >
              <KeyboardArrowUpOutlinedIcon className="text-md" />
              <p>Show Less</p>
            </Button>
          ) : (
            <Button
              onClick={() => setShowCount((prev) => prev + 3)}
              className="w-max text-gray-500"
            >
              <KeyboardArrowDownOutlinedIcon className="text-md" />
              <p>Show More</p>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
