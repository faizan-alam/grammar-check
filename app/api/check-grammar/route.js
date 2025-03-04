import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Please enter some text." },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://grammar-check-mocha.vercel.app/api/check-grammar",
      { text },
      { headers: { "Content-Type": "application/json" } }
    );

    if (!response.data.correctedText) {
      return NextResponse.json(
        { error: "Unable to process the request." },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      },
      { status: error.response?.status || 500 }
    );
  }
}
