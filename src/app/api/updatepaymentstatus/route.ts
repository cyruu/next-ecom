import Order from "@/models/OrderModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { orderId } = reqbody;

  try {
    // Find the order by ID
    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(String(orderId)),
    });

    if (!order) {
      return NextResponse.json({
        msg: "Order not found",
        statusCode: 404,
      });
    }

    // Update the payment status in the database
    const updatedOrder = await Order.updateOne(
      { _id: new mongoose.Types.ObjectId(String(orderId)) },
      { $set: { paymentStatus: "complete" } }
    );

    if (updatedOrder.modifiedCount === 0) {
      return NextResponse.json({
        msg: "Order status update failed",
        statusCode: 400,
      });
    }

    // Successful update response
    return NextResponse.json({
      msg: "Payment status updated successfully",
      statusCode: 200,
      updatedOrder,
    });
  } catch (error: any) {
    console.log("Error updating payment status:", error);
    return NextResponse.json({
      msg: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
}
