import Cart from "@/models/CartModel";
import Order from "@/models/OrderModel";
import Product from "@/models/ProductModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { orderId } = reqBody;

    // Fetch the order data by ID
    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(String(orderId)),
    });

    if (!order) {
      return NextResponse.json({ msg: "Order not found", statusCode: 404 });
    }

    const orderItems = order.orderitems;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ msg: "No items in order", statusCode: 400 });
    }

    console.log("Order items fetched:", orderItems);

    // Update product stock in database and Redis
    await Promise.all(
      orderItems.map(async (itemEach: any) => {
        try {
          // Find product in MongoDB
          const product = await Product.findOne({
            productName: itemEach.productName,
            price: itemEach.price,
          });

          if (!product) {
            console.error(
              `Product not found: ${itemEach.productName}, ${itemEach.price}`
            );
            return;
          }

          // Update product stock
          product.stock -= itemEach.quantity;

          if (product.stock < 0) {
            console.warn(
              `Stock for product ${product.productName} is below zero. Skipping update.`
            );
            return;
          }

          const updatedProduct = await product.save();
          console.log(
            `Updated stock for product ${updatedProduct.productName}: ${updatedProduct.stock}`
          );

          // ------------------------------------------
          // // Update the product in Redis
          // // ProductsList => explore page
          // let cachedProductsList: any = await redis.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}ProductsList`);
          // cachedProductsList = cachedProductsList
          // ? JSON.parse(cachedProductsList)
          // : [];

          // cachedProductsList = cachedProductsList.map((product: any) => {
          //   if (
          //     product.productName === itemEach.productName &&
          //     product.price === itemEach.price
          //   ) {
          //     return { ...product, stock: updatedProduct.stock };
          //   } else {
          //     return product;
          //   }
          // });

          // // set ProductsList => explore
          // await redis.set(`ProductsList`, JSON.stringify(cachedProductsList));
          // ------------------------------------------
        } catch (error) {
          console.error(`Error processing item: ${itemEach.productName}`);
        }
      })
    );

    // Delete usercart after processing order
    const uid = order.uid;

    const isCartDeleted = await Cart.deleteMany({
      userid: new mongoose.Types.ObjectId(String(uid)),
    });

    return NextResponse.json({
      msg: "Order processed and cart items deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({
      msg: "Internal server error",
      statusCode: 500,
    });
  }
}
