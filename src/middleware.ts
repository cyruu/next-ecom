import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const loginSignupPaths = ["/login", "/signup"];
  const isLoginSignupPath = loginSignupPaths.includes(path);
  // const adminPath = "/admin";
  // const isAdminPath = path === adminPath;
  // console.log("adminpath",isAdminPath);

  const publicPath = ["/", "/aayush", ""];
  const token = request.cookies.get("loginToken")?.value || "";
  console.log("middleware running");

  //     //cart -> checkout in login state
  //     const referrer = request.headers.get('referer');
  //   const isCheckoutPage = request.nextUrl.pathname === '/checkout';
  //   const isCartPage = request.nextUrl.pathname === '/cart';

  //   // If trying to access the checkout page, check the referrer
  //   if (isCheckoutPage && !referrer?.includes('/cart')) {
  //     return NextResponse.redirect(new URL('/', request.url)); // Redirect to cart page
  //   }

  if (isLoginSignupPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isLoginSignupPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
 
}
export const config = {
  matcher: ["/login", "/signup", "/cart", "/checkout","/admin"],
};
