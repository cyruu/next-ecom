import { notify } from "@/helper/notify";
import { Box, Button, Modal, Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 0,
};

const AdminReviewList = () => {
  const [allreviewList, setallreviewList] = useState([]);
  const [loading, setloading] = useState(true);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [updateAllReviewList, setupdateAllReviewList] = useState<any>(true);
  const tempArray = new Array(8).fill(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //fucntion get reviews
  async function getAllReviews() {
    setloading(true);
    const { data: resData } = await axios.get(`api/reviews/getallreviews`);
    console.log(resData.allReviewList);
    setallreviewList(resData.allReviewList);
    setloading(false);
  }
  //delete review function
  async function handleReviewDelete(reviewId: any) {
    setdeleteLoading(true);
    const { data: resData } = await axios.post("api/reviews/deletereview", {
      reviewId,
    });
    setdeleteLoading(false);
    if (resData.statusCode == 200) {
      notify(resData.msg, resData.statusCode);
      setupdateAllReviewList((prev: any) => !prev);
    }
    setSelectedReviewId(null);
  }
  useEffect(() => {
    getAllReviews();
  }, [updateAllReviewList]);
  return (
    <div className="bg-gray-50 min-h-[100%] px-[50px]  pt-6 pb-[60px] flex flex-col  ">
      <p className="text-2xl mb-5 ">Reviews</p>
      <div className="order-details mb-5 border rounded-lg bg-white p-5 shadow-sm w-full grid grid-cols-7 text-sm font-bold ">
        <p className="poppins col-span-2">Product</p>
        <p className="poppins">Posted by</p>
        <p className="poppins col-span-2">Review</p>
        <p className="poppins">Sentiment</p>
        <p className="poppins">Action</p>
      </div>
      {/* allreviewlist array loading */}
      {loading ? (
        tempArray.map((el, i) => {
          return (
            <Skeleton
              key={i}
              variant="rounded"
              className="w-full mb-3"
              height={45}
            />
          );
        })
      ) : // no items in allreviewList
      allreviewList.length == 0 ? (
        <p className="border text-xl rounded-lg h-max px-5 py-4 mb-3 w-full bg-white flex items-center justify-center shadow-sm">
          No reviews yet.
        </p>
      ) : (
        allreviewList.map((review: any) => {
          return (
            <div
              key={review._id}
              className="border rounded-lg h-max px-5 py-2 mb-3 w-full bg-white grid grid-cols-7 items-center shadow-sm"
            >
              {/* image-name */}
              <div className="image-name poppins col-span-2 pr-2 flex items-center">
                <div className="product-image h-[35px] w-[35px] flex items-center justify-center object-contain">
                  <img
                    src={review.productId.image}
                    alt={review.productId.productName}
                  />
                </div>
                <p className="poppins text-xs ml-1">
                  {review.productId.productName}
                </p>
              </div>
              {/* posted-by */}
              <p className="posted-by poppins break-words pr-3 text-xs">
                {review.userName}
              </p>
              {/* review */}
              <p className="review poppins col-span-2 pr-3 text-xs">
                {review.review}
              </p>
              {/* sentiment */}
              <div className="sentiment poppins flex items-center ">
                <div
                  className={`sentimet-cicle h-[8px] w-[8px] mr-1 rounded-full ${
                    review.sentiment == "positive"
                      ? "bg-green-400"
                      : review.sentiment == "negative"
                      ? "bg-red-400"
                      : review.sentiment == "neutral"
                      ? "bg-gray-400"
                      : "bg-gray-400"
                  }`}
                ></div>
                <p className="text-xs">{review.sentiment}</p>
              </div>
              {/* delete modal */}
              <Button
                className="poppins text-xs w-max"
                disableElevation
                variant="contained"
                color="error"
                size="small"
                onClick={() => setSelectedReviewId(review._id)}
              >
                Delete
              </Button>

              <Modal
                BackdropProps={{
                  style: { backgroundColor: "rgba(0,0 ,0 , 0.5)" },
                }}
                open={selectedReviewId === review._id}
                onClose={() => setSelectedReviewId(null)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box
                  sx={{ ...style }}
                  className="w-[400px] py-7 text-center rounded-lg"
                >
                  {deleteLoading ? (
                    <div>
                      <CircularProgress size={40} color="error" />
                      <p className="mt-4 text-md text-gray-500">Deleting...</p>
                    </div>
                  ) : (
                    <>
                      <p className="poppins font-bold text-2xl ">
                        Delete Confirmation
                      </p>
                      <p className="text-xs poppins mt-2 mb-7 text-gray-500">
                        Are you sure you want to Delete?
                      </p>
                      <div className="flex justify-center">
                        <Button
                          variant="contained"
                          size="medium"
                          color="error"
                          className="mr-3"
                          onClick={() => handleReviewDelete(review._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          className="ml-3"
                          size="medium"
                          onClick={() => setSelectedReviewId(null)} // Close modal
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </Box>
              </Modal>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminReviewList;
