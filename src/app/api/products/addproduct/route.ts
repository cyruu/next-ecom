"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { productName, categoryId, price, image, stock, description } =
      reqbody;
    const newProduct = new Product({
      productName,
      categoryId: new mongoose.Types.ObjectId(String(categoryId)),
      price,
      image,
      stock,
      description,
    });
    const savedNewProduct = await newProduct.save();
    if (savedNewProduct) {
      // console.log("inside");

      let productList = await Product.find({});

      return NextResponse.json({
        msg: "New Product Added",
        savedNewProduct,
        productList,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    console.log("its addproduct route", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, addproductRoute",
      error: error.message,
      statusCode: 404,
    });
  }
}
