// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    // **Replace this with your actual Gemini API call**
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(query);
      const response = await result.response;
      const apiResponse = response.text();

      return NextResponse.json({ response: apiResponse });
    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError);
      return NextResponse.json({ error: 'Failed to fetch data from Gemini API' }, { status: 500 });
    }
  } catch (parseError) {
    console.error("Request Parsing Error:", parseError);
    return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
  }
}