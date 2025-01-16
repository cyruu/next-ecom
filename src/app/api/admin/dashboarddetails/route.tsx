"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import Order from "@/models/OrderModel";
import Product from "@/models/ProductModel";
import Review from "@/models/ReviewModel";
import User from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
dbconnect();
export async function GET(request: NextRequest) {
  console.log("helo from dashboard api");
  try {
    const productsCount = await Product.countDocuments();
    console.log("no of products", productsCount);

    const usersCount = await User.countDocuments();
    console.log("no of UsersCount", usersCount);

    const categoriesCount = await Category.countDocuments();
    console.log("no of categories", categoriesCount);

    const allUserReviewsCount = await Review.countDocuments();
    console.log("no of allUserReviews", allUserReviewsCount);

    const orders = await Order.find();
    console.log("no of orders", orders.length);

    let total = 0;
    orders.map((eachOrder) => {
      total += eachOrder.total;
    });
    console.log("Total Sales", total);

    // if (OrderList) {
    return NextResponse.json({
      msg: "Dashboard Details found",
      productsCount,
      categoriesCount,
      usersCount,
      allUserReviewsCount,
      total,
      statusCode: 200,
    });
    // }
  } catch (error: any) {
    console.log("Internal server error, OrderList route", error.message);
    return NextResponse.json({
      msg: "Internal server error, get OrderList route",
      error: error.message,
      statusCode: 204,
    });
  }
}
