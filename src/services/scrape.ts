import { eventSchema } from "@/schemas/zodDTOs";
import { extractAndValidateJson } from "@/utils/ai";
import { getMarkdownFromUrl } from "@/utils/jina";
import { zodToJsonSchema } from "zod-to-json-schema";
import { callDeepseekTextResponse, callQwen } from "@/utils/ai";
import { getUrlImage } from "@/utils/puppeteer";

export async function initiallyScrapeUrl(url: string) {
  const markdown = await getMarkdownFromUrl(url);
  const prompt = `Extract all the events from the markdown according to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`): 
    
    ${JSON.stringify(zodToJsonSchema(eventSchema), null, 2)}
  
${markdown}`;

  const response = await callDeepseekTextResponse(prompt);
  console.log(response);
  const events = extractAndValidateJson(response, eventSchema);

  return events;
}

export async function initiallyScrapeUrlImage(url: string) {
  const image = await getUrlImage(url);
  console.log("got image");
  const prompt = `Extract all the events from the image according to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`): 
  For reference, the current date is ${new Date().toISOString()}.
    
    ${JSON.stringify(zodToJsonSchema(eventSchema), null, 2)}
  `;
  console.log("eventprompt", prompt);
  const response = await callQwen(prompt, image);
  console.log("scrape with gemini image");
  console.log(response);
  const events = extractAndValidateJson(response, eventSchema);
  return events;
}
