"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { categoryName } = reqbody;
    const newCategory = new Category({
      categoryName,
    });
    const savedNewCategory = await newCategory.save();

    return NextResponse.json({
      msg: "New Category Added",
      savedNewCategory,
      statusCode: 200,
    });
  } catch (error: any) {
    console.log("its add category reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, addCategoryRoute",
      error: error.message,
      statusCode: 204,
    });
  }
}
