"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import Order from "@/models/OrderModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const {
      uid,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      finalTotal,
      paymentmethod,
      checkoutCartList,
    } = reqbody;
    const newOrder = new Order({
      //   uid: new mongoose.Types.ObjectId(String(uid)),
      uid,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      total: finalTotal,
      paymentmethod,
      orderitems: checkoutCartList,
    });
    const savedNewOrder = await newOrder.save();
    // sort and add in redis
    // present in redis
    // orderlist not present in redis

    console.log("order list not found in redis so fetch from db");
    // this not fetching orf=der that is added above
    let OrderList = await Order.find({
      uid: uid,
      paymentStatus: "complete",
    }).sort({ createdAt: -1 });
    OrderList.push(savedNewOrder);
    OrderList = OrderList.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      msg: "OrderList fetched from db after adding new one",
      savedNewOrder,
      // isCartDeleted,
      statusCode: 200,
    });
  } catch (error: any) {
    console.log("its order route", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, orderRoute",
      error: error.message,
      statusCode: 204,
    });
  }
}
