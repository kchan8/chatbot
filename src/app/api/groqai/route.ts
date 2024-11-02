import { groq, createGroq } from "@ai-sdk/groq";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Groq access...");
  const result = await streamText({
    // model: openai("gpt-4o-mini"),
    model: groq("gemma2-9b-it"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
