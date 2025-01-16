"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

dbconnect();

export async function GET() {
  try {
    const bestProductsList = await Product.find({ status: "trending" });

    if (bestProductsList && bestProductsList.length > 0) {
      return NextResponse.json({
        msg: "Category list found",
        bestProductsList,
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
