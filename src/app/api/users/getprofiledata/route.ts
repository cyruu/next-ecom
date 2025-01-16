"use server";

import { dbconnect } from "@/helper/dbconnect";
import ProfileData from "@/models/ProfileDataModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { uid } = reqbody;

  try {
    // Fetch profile data directly from the database
    const profileData = await ProfileData.findOne({
      uid: String(uid),
    });

    if (profileData) {
      return NextResponse.json({
        msg: "Profile data found",
        profileData,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed to find profile data",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Error fetching profile data:", error);
    return NextResponse.json({
      msg: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
}
