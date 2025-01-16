"use server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbconnect } from "@/helper/dbconnect";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    // Check if the user exists
    const userCheck = await User.findOne({ username });
    if (!userCheck) {
      return NextResponse.json({ msg: "User not found", statusCode: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userCheck.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json({ msg: "Incorrect password", statusCode: 401 });
    }

    // Generate JWT token
    const loggedInUser = {
      userId: userCheck._id,
      username: userCheck.username,
      userEmail: userCheck.email,
      isAdmin: userCheck.isadmin,
    };

    const token = jwt.sign(loggedInUser, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    // Set the JWT token in a cookie
    const response = NextResponse.json({
      msg: "Logging in successfully",
      statusCode: 200,
    });

    response.cookies.set("loginToken", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error: any) {
    console.log("Internal server error, login route:", error.message);
    return NextResponse.json({
      msg: "Internal server error, login route",
      error: error.message,
      statusCode: 500,
    });
  }
}
