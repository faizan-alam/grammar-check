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
      `${process.env.OPEN_AI_URL}/completions`,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Fix grammatical errors in this text and return only the corrected version without any additional text or quotes: "${text}"`,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.choices||!response.data.choices?.length) {
      return NextResponse.json(
        { error: "Unable to process the request." },
        { status: 500 }
      );
    }
    let correctedText = response.data.choices[0].message.content;
    correctedText = correctedText.replace(/^"(.*)"$/, "$1");

    return NextResponse.json({
      originalText: text,
      correctedText: correctedText,
    });
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
