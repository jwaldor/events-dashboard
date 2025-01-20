import { eventSchema } from "@/schemas/zodDTOs";
import { extractAndValidateJson } from "@/utils/ai";
import { getMarkdownFromUrl } from "@/utils/jina";
import { zodToJsonSchema } from "zod-to-json-schema";
import { callDeepseekTextResponse } from "@/utils/ai";

export async function initiallyScrapeUrl(url: string) {
  const markdown = await getMarkdownFromUrl(url);
  const prompt = `Extract all the events from the markdown according to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`): 
    
    ${JSON.stringify(zodToJsonSchema(eventSchema))}
  
${markdown}`;

  const response = await callDeepseekTextResponse(prompt);
  console.log(response);
  const events = extractAndValidateJson(response, eventSchema);

  return events;
}

export async function initiallyScrapeUrlGeminiImage(url: string) {
  const image = await getImageFromUrl(url);
  const prompt = `Extract all the events from the image according to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`): 
    
    ${JSON.stringify(zodToJsonSchema(eventSchema))}
  
${image}`;
}
