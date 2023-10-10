import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith("/logout")) {
    const logSerealized = serialize("userAuth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    let response = NextResponse.redirect(new URL("/", request.url), {
      headers: request.headers,
    });
    console.log(response.cookies.get("userAuth"));
    response.headers.set("Set-Cookie", logSerealized);

    return response;
  }
  if (request.nextUrl.pathname.endsWith("/")) {
    return NextResponse.redirect(new URL("/reviewsStart", request.url));
  }
  return NextResponse.next();
}

export default middleware;
