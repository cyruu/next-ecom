"use server";
import { dbconnect } from "@/helper/dbconnect";
import Review from "@/models/ReviewModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const pid = reqbody.pId;

    // Fetch Reviews directly from the database
    const ReviewsList = await Review.find({
      productId: new mongoose.Types.ObjectId(pid),
    }).sort({ createdAt: -1 });

    if (ReviewsList && ReviewsList.length > 0) {
      return NextResponse.json({
        msg: "Reviews list found",
        ReviewsList,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, Reviews list not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, getreviews route", error.message);
    return NextResponse.json({
      msg: "Internal server error, getreviews route",
      error: error.message,
      statusCode: 204,
    });
  }
}
