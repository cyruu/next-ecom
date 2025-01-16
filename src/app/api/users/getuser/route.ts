import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// main
export async function GET(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get("loginToken")?.value || "";

    if (cookieToken) {
      try {
        // Verify the JWT token
        const jwtTokenData = jwt.verify(
          cookieToken,
          process.env.JWT_SECRET_KEY!
        );

        if (jwtTokenData) {
          return NextResponse.json({
            msg: "User available",
            statusCode: 200,
            jwtTokenData,
          });
        }
      } catch (err: any) {
        return NextResponse.json({
          msg: "Invalid JWT token",
          statusCode: 401,
          error: err.message,
        });
      }
    }

    return NextResponse.json({
      msg: "User not authenticated",
      statusCode: 404,
      cookieToken: null,
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong while processing the request",
      statusCode: 500,
      error: error.message,
    });
  }
}
