import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create a response message indicating successful logout
    const response = NextResponse.json({
      msg: "Logout Successful",
      statusCode: 200,
    });

    // Clear the loginToken cookie by setting it to an empty value and an expired date
    response.cookies.set("loginToken", "", {
      httpOnly: true,
      expires: new Date(0), // The cookie will expire immediately
    });

    return response;
  } catch (error: any) {
    // Log the error and return a response with the error message
    console.log("Error during logout:", error.message);
    return NextResponse.json({
      msg: "Error during logout",
      error: error.message,
      statusCode: 500,
    });
  }
}
