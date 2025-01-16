"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    const categoryList = await Category.find({});

    if (categoryList && categoryList.length > 0) {
      return NextResponse.json({
        msg: "Category list found",
        categoryList,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, Category list not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, getcategory route", error.message);
    return NextResponse.json({
      msg: "Internal server error, getcategory route",
      error: error.message,
      statusCode: 204,
    });
  }
}
