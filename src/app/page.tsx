"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <main className="fixed w-full h-full bg-muted">
      <div className="container mx-auto w-full h-full flex flex-col py-8">
        <div className="flex-1 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-auto relative">
          <Textarea
            className="w-full text-lg"
            placeholder="Message LLM"
            value={input}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </main>
  );
}
