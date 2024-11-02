import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-pro"),
    // messages: convertToCoreMessages(messages),
    messages: messages,
  });

  return result.toDataStreamResponse();
}
