"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { pid } = reqBody;

    // Fetch product directly from the database
    const thisproduct = await Product.find({
      _id: new mongoose.Types.ObjectId(String(pid)),
    });

    if (thisproduct && thisproduct.length > 0) {
      return NextResponse.json({
        msg: "Product found",
        thisproduct,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, product not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, thisproduct route", error.message);
    return NextResponse.json({
      msg: "Internal server error, thisproduct route",
      error: error.message,
      statusCode: 204,
    });
  }
}
