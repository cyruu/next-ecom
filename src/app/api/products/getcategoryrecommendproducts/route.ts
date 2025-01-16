"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { productId } = reqBody;

    // Fetch the product using the productId
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(String(productId)),
    });

    // If product is found, find recommended products from the same category
    if (product) {
      const categoryId = product.categoryId;

      // Find other products in the same category, excluding the current product
      const recommendProductList = await Product.find({
        categoryId: categoryId,
        _id: { $ne: new mongoose.Types.ObjectId(String(productId)) }, // Exclude the productId
      });

      return NextResponse.json({
        msg: "Recommended product list found in db",
        recommendProductList,
        statusCode: 200,
      });
    } else {
      // If product not found
      console.log("Cannot find product with productId:", productId);
      return NextResponse.json({
        msg: "Cannot find product with the provided productId",
        statusCode: 204,
      });
    }
  } catch (error: any) {
    console.log(
      "Internal server error, getcategoryrecommendproducts route",
      error
    );
    return NextResponse.json({
      msg: "Internal server error, getcategoryrecommendproducts route",
      error: error.message,
      statusCode: 204,
    });
  }
}
