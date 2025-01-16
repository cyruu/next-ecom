"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  console.log("connected");
  const reqbody = await request.json();
  const { cid } = reqbody;
  // console.log(cid);
  const CategoryProducts = await Product.find({
    categoryId: new mongoose.Types.ObjectId(String(cid)),
  });
  // console.log(CategoryProducts);

  return NextResponse.json({
    msg: "Search found ",
    // savedUser,
    CategoryProducts,
    statusCode: 200,
  });
}
