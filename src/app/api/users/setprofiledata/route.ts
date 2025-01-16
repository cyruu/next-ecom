import ProfileData from "@/models/ProfileDataModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { uid, firstName, lastName, email, phone, address, city } = reqBody;

    // Check if profile data already exists for the user
    const fetchedProfileData = await ProfileData.findOne({ uid: String(uid) });

    // New data in profile data
    if (!fetchedProfileData) {
      const newProfileData = new ProfileData({
        uid,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
      });
      const savedProfileData = await newProfileData.save();

      if (savedProfileData) {
        return NextResponse.json({
          msg: "New Profile Data Added",
          savedProfileData,
          statusCode: 200,
        });
      } else {
        return NextResponse.json({
          msg: "Failed to add New Profile Data",
          statusCode: 204,
        });
      }
    }

    // If existing profile data found, update it
    const updatedProfileData = await ProfileData.findOneAndUpdate(
      { uid: String(uid) }, // Filter
      { $set: { firstName, lastName, email, phone, address, city } },
      { new: true } // Returns the updated document
    );

    if (updatedProfileData) {
      return NextResponse.json({
        msg: "Successfully updated",
        updatedProfileData,
        statusCode: 200,
      });
    } else {
      return NextResponse.json({
        msg: "Found existing profile data, failed to update",
        statusCode: 204,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      msg: "Internal server error in setprofiledata route",
      error: error,
      statusCode: 500,
    });
  }
}
