import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
// use gareko chaina because thunk ko api/users/getUser ma comment gareko namilera
export const getTokenData = (request: NextRequest) => {
  try {
    console.log("getting token data from cookie");

    const loginToken = request.cookies.get("loginToken")?.value;

    if (loginToken) {
      console.log("loginToken found in cookie", loginToken);
      const loginTokenData = jwt.verify(
        loginToken,
        process.env.JWT_SECRET_KEY!
      ) as JwtPayload;

      // string ma aairako cha id
      return loginTokenData;
    }
    console.log("token not found in cookie");

    return null;
  } catch (error) {
    console.log(error);
  }
};