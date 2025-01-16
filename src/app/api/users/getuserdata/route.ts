"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import User from "@/models/UserModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { uid } = reqbody;

  try {
    // Fetch user data directly from the database
    const userData = await User.find({
      _id: new mongoose.Types.ObjectId(String(uid)),
    });

    if (userData && userData.length > 0) {
      return NextResponse.json({
        msg: "User data found",
        userData,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed to find User",
      statusCode: 404,
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Error while fetching user data",
      statusCode: 500,
      error: error.message,
    });
  }
}
