"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id } = reqbody;
    console.log("req", reqbody);
    console.log("Product ID:", _id); // Log the ID to verify it's correct

    // Check if the ID is provided and valid

    const deleteProduct = await Product.deleteOne({ _id });

    if (deleteProduct) {
      console.log("inside");
      // --------------- remaining cart remove
      // delete all cartitems

      return NextResponse.json({
        msg: `Product Deleted`,
        deleteProduct,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    console.log("its delete product reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, del product Route",
      error: error.message,
      statusCode: 404,
    });
  }
}
