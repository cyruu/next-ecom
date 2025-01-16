

"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
dbconnect();
export async function GET() {

  try {
    const gridProductsList = await Product.find({status:"grid"});
    if (gridProductsList) {
      return NextResponse.json({
        msg: "Grid Products list found",
        gridProductsList,
        statusCode: 200,
      });
    }
    return NextResponse.json({
      msg: "Failed, Category list not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, getgridproducts route", error.message);
    return NextResponse.json({
      msg: "Internal server error, getgridproducts route",
      error: error.message,
      statusCode: 204,
    });
  }
}
