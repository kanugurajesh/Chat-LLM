import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: "Hello, can you answer my questions.",
    },
    {
      role: "model",
      parts: "Sure, what do you want to know?",
    },
  ],
  generationConfig: {
    maxOutputTokens: 100,
  },
});

export async function POST(req: NextRequest) {

  // get prompt field from the request body
  const reqBody = await req.json();

  // get the userPrompt from the request body
  const { userPrompt } = reqBody;

  const result = await chat.sendMessage(userPrompt);

  // console.log(result)

  const response = await result.response;

  const text = response.text();

  console.log(text);

  return NextResponse.json({
    text
  });

}