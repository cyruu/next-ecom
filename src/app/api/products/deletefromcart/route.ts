"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { product, uid } = reqbody;
  const cartId = product._id;

  try {
    const cartItemsList = await Cart.deleteOne({
      _id: new mongoose.Types.ObjectId(cartId),
    });

    if (cartItemsList.deletedCount != 0) {
      return NextResponse.json({
        msg: "Item Deleted Successfully",
        statusCode: 200,
      });
    }
    return NextResponse.json({
      msg: "Failed to Delete",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log(
      "Internal server error, delete cart items route",
      error.message
    );
    return NextResponse.json({
      msg: "Internal server error, delete Cart items route",
      error: error.message,
      statusCode: 204,
    });
  }
}
