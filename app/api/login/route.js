import { NextResponse } from "next/server";
import connectionDatabase from "../../../lib/mongoose";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectionDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide email and password." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { message: "Login successful.", accessToken, user },
      { status: 200 }
    );

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error.", error: error.message },
      { status: 500 }
    );
  }
}
