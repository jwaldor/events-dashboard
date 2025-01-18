import OpenAI from "openai";
import { z } from "zod";
export function extractAndValidateJson<T extends z.ZodType>(
  text: string,
  schema: T
): z.infer<T> {
  // Find content between triple backticks
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (!match) {
    throw new Error("No JSON found between triple backticks");
  }

  const jsonString = match[1].trim();

  try {
    // Parse the JSON string
    const parsedJson = JSON.parse(jsonString);

    // Validate against the Zod schema
    const validated = schema.parse(parsedJson);

    return validated;
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new Error(`JSON validation failed: ${e.message}`);
    }
    throw new Error(
      `JSON parsing failed: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
}

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});
//didn't end up using this because the API was very, very slow
export async function callDeepseekTextResponse(
  prompt: string
): Promise<string> {
  try {
    const completion = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (completion.choices[0].message.content) {
      return completion.choices[0].message.content;
    }
    throw new Error("No content in the response");
  } catch (error) {
    console.error("Error calling Deepseek:", error);
    throw error;
  }
}
