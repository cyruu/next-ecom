import { dbconnect } from "@/helper/dbconnect";
import Review from "@/models/ReviewModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    // Fetch all reviews from the database
    const allReviewList = await Review.find()
      .sort({ createdAt: -1 })
      .populate("productId");

    console.log("All reviews fetched from database");
    return NextResponse.json({
      msg: "All reviews fetched successfully",
      allReviewList,
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
