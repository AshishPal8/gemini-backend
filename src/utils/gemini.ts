import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiAPIKey } from ".";

const genAI = new GoogleGenerativeAI(geminiAPIKey!);

export const getGeminiReply = async (
  messages: { role: string; content: string }[]
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent({
    contents: messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  return result.response.text();
};
