import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });

  return response;
}
