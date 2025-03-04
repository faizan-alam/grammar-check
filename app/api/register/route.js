import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectionDatabase from "../../../lib/mongoose";
import User from "../../../models/User";

export async function POST(req) {
  await connectionDatabase();

  try {
    const { firstName, email, password } = await req.json();

    if (!firstName || !email || !password) {
      return NextResponse.json(
        { message: "Please provide first name, email, and password." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error.", error: error.message },
      { status: 500 }
    );
  }
}
