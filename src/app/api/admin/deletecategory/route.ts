"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import { log } from "console";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id } = reqbody;
    // console.log("req", reqbody);
    // console.log("Category ID:", _id); // Log the ID to verify it's correct

    // Check if the ID is provided and valid

    const deleteCategory = await Category.deleteOne({ _id });

    if (deleteCategory) {
      // console.log("inside");

      let categoryList = await Category.find({});

      return NextResponse.json({
        msg: `Category Deleted`,
        deleteCategory,
        categoryList,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    console.log("its del Category reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, edit category Route",
      error: error.message,
      statusCode: 204,
    });
  }
}
