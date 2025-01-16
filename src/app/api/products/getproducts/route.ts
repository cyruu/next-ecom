"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    // Fetch products directly from the database
    const ProductsList = await Product.find();

    if (ProductsList && ProductsList.length > 0) {
      return NextResponse.json({
        msg: "Products list found",
        ProductsList,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, Products list not found",
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
