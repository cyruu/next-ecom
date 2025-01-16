"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { product, userId } = reqbody;
  const { productName, price, image, stock, _id: pid } = product;

  const alreadyInCart = await Cart.findOne({
    userid: new mongoose.Types.ObjectId(userId),
    productId: new mongoose.Types.ObjectId(String(pid)),
  });

  if (alreadyInCart) {
    return NextResponse.json({
      msg: "Product Already in Cart",
      statusCode: 204,
    });
  }

  const newCartProduct = new Cart({
    userid: new mongoose.Types.ObjectId(String(userId)),
    productId: new mongoose.Types.ObjectId(String(pid)),
    productName,
    price,
    image,
    stock,
  });

  await newCartProduct.save();

  return NextResponse.json({
    msg: "Product Added to Cart",
    statusCode: 200,
  });
}
