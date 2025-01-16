"use server";
import { dbconnect } from "@/helper/dbconnect";
import Review from "@/models/ReviewModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { loggedInUser, userId, userName, sentimentResult, review, pId } =
      reqbody;

    const newProductReview = new Review({
      productId: pId,
      userid: new mongoose.Types.ObjectId(String(userId)),
      userName,
      sentiment: sentimentResult,
      review,
    });

    const savedReview = await newProductReview.save();

    return NextResponse.json({
      msg: "Review Added",
      savedReview,
      statusCode: 200,
    });
  } catch (error: any) {
    console.log("its addreview route", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, addReviewRoute",
      error: error.message,
      statusCode: 500,
    });
  }
}
