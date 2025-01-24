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

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY is not set");
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
      max_tokens: 4096,
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

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not set");
}
const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const callOpenRouterModel = async (
  prompt: string,
  base64Image: string,
  model: string
): Promise<string> => {
  try {
    console.log("theimage", base64Image.slice(0, 100));
    const completion = await openRouter.chat.completions.create({
      model: model,
      max_tokens: 4096,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log("qwen response", JSON.stringify(completion));
    if (completion.choices[0].message) {
      return completion.choices[0].message.content;
    }
    throw new Error("No content in the response");
  } catch (error) {
    console.error("Error calling Qwen:", error);
    throw error;
  }
};
