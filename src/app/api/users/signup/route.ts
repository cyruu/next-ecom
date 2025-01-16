"use server";
import bcryptjs from "bcryptjs";
import { dbconnect } from "@/helper/dbconnect";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function POST(request: NextRequest) {
  const reqbody = await request.json();
  const { username, email, password } = reqbody;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return NextResponse.json({ msg: "user already Exists", statusCode: 204 });
  }
  //hashing
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new User({
    username: username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  return NextResponse.json({
    msg: "new user Created",
    savedUser,
    statusCode: 200,
  });
}
