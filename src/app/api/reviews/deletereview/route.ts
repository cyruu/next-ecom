import { dbconnect } from "@/helper/dbconnect";
import Review from "@/models/ReviewModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { reviewId } = reqBody;
    console.log("id to delete", reviewId);

    // Delete review from the database
    const deleteReview = await Review.findByIdAndDelete(reviewId);

    if (!deleteReview) {
      return NextResponse.json({
        msg: "Review not found.",
        statusCode: 204,
      });
    }

    // Successful delete
    return NextResponse.json({
      msg: "Deleted successfully.",
      deleteReview,
      statusCode: 200,
    });
  } catch (error: any) {
    console.log("Internal server error at getreviews.ts route", error);

    return NextResponse.json({
      msg: "Internal server error at getreviews.ts route",
      error: error.message,
    });
  }
}
