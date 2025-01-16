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
    const { editCategoryName, _id } = reqbody;
    console.log("req", reqbody);
    console.log("Category ID:", _id); // Log the ID to verify it's correct

    // Check if the ID is provided and valid

    const findCategory = await Category.findById({ _id });
    // console.log("found", findCategory);
    findCategory.categoryName = editCategoryName;
    const savedEditCategory = await findCategory.save();

    if (savedEditCategory) {
      console.log("inside");

      let categoryList = await Category.find({});
      return NextResponse.json({
        msg: `Category Edited `,
        savedEditCategory,
        categoryList,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    console.log("its editCategory reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, edit category Route",
      error: error.message,
      statusCode: 204,
    });
  }
}
