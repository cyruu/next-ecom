"use server";
import { dbconnect } from "@/helper/dbconnect";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  console.log("connected");
  const reqbody = await request.json();
  const { searchQuery} = reqbody;
    console.log(searchQuery);
    const SearchProducts = await Product.find({ productName: { $regex: searchQuery, $options: "i" } });
  return NextResponse.json({
    msg: "Search found ",
    // savedUser,
    SearchProducts,
    statusCode: 200,
  });
}
