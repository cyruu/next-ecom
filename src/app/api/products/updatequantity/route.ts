"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  console.log(reqbody);
  const { cartId, uid, quantity } = reqbody;

  // Fetch the cart item from the database
  const InCart = await Cart.findOne({
    _id: new mongoose.Types.ObjectId(String(cartId)),
  });

  if (!InCart) {
    return NextResponse.json({
      msg: "Error updating quantity",
      statusCode: 204,
    });
  }

  // Update the quantity and save it
  InCart.quantity = quantity;
  const savedCart = await InCart.save();

  // Fetch the updated cart items from the database (instead of Redis)
  const cartItemsList = await Cart.find({
    userid: new mongoose.Types.ObjectId(uid),
  });

  return NextResponse.json({
    msg: "Quantity Updated in Cart",
    statusCode: 200,
    cartItemsList,
  });
}
