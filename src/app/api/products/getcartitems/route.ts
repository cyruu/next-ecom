"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const uid = reqbody.userId;

  try {
    const cartItemsList = await Cart.find({
      userid: new mongoose.Types.ObjectId(uid),
    });

    if (cartItemsList && cartItemsList.length > 0) {
      return NextResponse.json({
        msg: "Cart Items list found",
        cartItemsList,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Failed, Cart items list not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, getCart items route", error.message);
    return NextResponse.json({
      msg: "Internal server error, get Cart items route",
      error: error.message,
      statusCode: 204,
    });
  }
}
