import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const isAuthPage = ["/login", "/signup"].includes(req.nextUrl.pathname);

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/grammar", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/grammar", "/signup", "/login"],
};
