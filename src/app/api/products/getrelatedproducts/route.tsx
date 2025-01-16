"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    // Fetch related products directly from the database
    const relatedProductsList = await Product.find();

    if (relatedProductsList && relatedProductsList.length > 0) {
      return NextResponse.json({
        msg: "Related products list found",
        relatedProductsList,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, Related products list not found",
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
