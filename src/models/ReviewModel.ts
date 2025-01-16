import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
    sentiment: {
      type: String,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
