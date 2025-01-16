"use server";
import { dbconnect } from "@/helper/dbconnect";
import Category from "@/models/CategoryModel";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function GET(request: NextRequest) {
  try {
    console.log("reached route");

    const userList = await User.find();
    // console.log(userList);

    return NextResponse.json({
      msg: "Users list FOund",
      userList,
      statusCode: 200,
    });
  } catch (error: any) {
    console.log("its get users  reoute", error.message);
    return NextResponse.json({
      msg: "Internal Server Error, get useers Route",
      error: error.message,
      statusCode: 204,
    });
  }
}
