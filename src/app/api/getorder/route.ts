"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import Order from "@/models/OrderModel";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const uid = reqbody.uid;

    console.log("orders from db");

    //fetch form db
    let OrderList = await Order.find({
      uid: uid,
      paymentStatus: "complete",
    }).sort({ createdAt: -1 });
    if (OrderList) {
      return NextResponse.json({
        msg: "OrderList list found",
        OrderList,
        statusCode: 200,
      });
    }
    return NextResponse.json({
      msg: "OrderList list not found",
      statusCode: 204,
    });
  } catch (error: any) {
    console.log("Internal server error, OrderList route", error.message);
    return NextResponse.json({
      msg: "Internal server error, get OrderList route",
      error: error.message,
      statusCode: 204,
    });
  }
}
