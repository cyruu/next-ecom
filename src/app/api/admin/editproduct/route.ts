"use server";
import { dbconnect } from "@/helper/dbconnect";
import Cart from "@/models/CartModel";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import { log } from "console";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const {
      productId,
      productName,
      categoryId,
      price,
      image,
      stock,
      description,
    } = reqbody;

    // also update cart stock
    // const findCart = await Cart.find({
    //   productId: new mongoose.Types.ObjectId(productId),
    // });
    // console.log("found cart", findCart);

    // findCart.stock = stock;
    // await findCart.save();

    // Check if the ID is provided and valid
    const findProduct = await Product.findById({
      _id: new mongoose.Types.ObjectId(String(productId)),
    });

    // console.log("found");
    findProduct.productName = productName;
    findProduct.price = price;
    findProduct.image = image;
    findProduct.stock = stock;
    findProduct.description = description;

    // console.log("before catid");
    findProduct.categoryId = new mongoose.Types.ObjectId(String(categoryId));
    // console.log("aftercatid");
    const savedEditProduct = await findProduct.save();

    if (savedEditProduct) {
      // console.log("inside");

      // delete from redis
      const findProduct = await Cart.find({
        productId: new mongoose.Types.ObjectId(String(productId)),
      });
      if (Array.isArray(findProduct)) {
        for (const itemEach of findProduct) {
          itemEach.stock = stock;
          itemEach.price = price;
          await itemEach.save();
        }
      }

      // --------------- remaining cart remove
      // delete all cartitems

      // let productList: any = await redis.set("ProductsList", "");
      // productList = await Product.find({});
      // if (productList) {
      //   await redis.set("ProductsList", JSON.stringify(productList));
      //   console.log("productList redis updated");
      // }
      return NextResponse.json({
        msg: `Product Edited `,
        savedEditProduct,
        statusCode: 200,
      });
    }
  } catch (error: any) {
    console.log("its edit product reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, edit product Route",
      error: error.message,
      statusCode: 204,
    });
  }
}
