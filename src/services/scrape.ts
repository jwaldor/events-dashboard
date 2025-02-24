import { eventSchema } from "@/schemas/zodDTOs";
import { callOpenRouterModelNoImage, extractAndValidateJson } from "@/utils/ai";
import { getMarkdownFromUrl } from "@/utils/jina";
import { zodToJsonSchema } from "zod-to-json-schema";
import { callDeepseekTextResponse, callOpenRouterModel } from "@/utils/ai";
// import { getUrlImage } from "@/utils/puppeteer";
import { capturePageScreenshot } from "@/utils/browserless";
import {
  GeneratedEvent,
  GeneratedEventWithoutParentUrlId,
} from "@/schemas/zodDTOs";
import { Event } from "@prisma/client";

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

export async function initiallyScrapeUrlImage(
  url: string,
  model: string
): Promise<GeneratedEventWithoutParentUrlId[]> {
  const image = await capturePageScreenshot(url, 2400);
  console.log("got image");
  const prompt = `Extract all the events from the image according to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`): 
  For reference, the current date is ${new Date().toISOString()}.
    
    ${JSON.stringify(zodToJsonSchema(eventSchema), null, 2)}
  `;
  console.log("eventprompt", prompt);
  const response = await callOpenRouterModel(prompt, image, model);
  console.log("scrape with gemini image");
  console.log(response);
  const events = extractAndValidateJson(response, eventSchema);
  // Ensure each event's rawText is defined
  const normalizedEvents = events.map((event) => ({
    ...event,
    rawText: event.rawText,
    extractedTitle: event.extractedTitle,
    location: event.location,
    dateTime: event.dateTime ? new Date(event.dateTime) : null,
    additionalInfo: event.additionalInfo,
    imageUrl: event.imageUrl,
    repeating: event.repeating,
    eventUrl: event.eventUrl,
  }));

  return normalizedEvents;
}

export async function updateScrapeUrlImage(
  newEvents: GeneratedEvent[],
  alreadyScrapedEvents: Event[],
  model: string
): Promise<Omit<GeneratedEvent, "parentUrlId">[]> {
  const prompt = `
  You are helping to update the database with new events that have been scraped. You will be given a list of events that have are already in the database and a list of newly scraped events.
  We want to incorporate the newly scraped events into the database in a way that does not result in duplicates.
  Your job is to output the events from the newly scraped events that are not already in the database.
  The events are adhering to the following JSON schema. Enclose the JSON within triple backticks (\`\`\`):
  ${JSON.stringify(zodToJsonSchema(eventSchema), null, 2)}

  Events that are already in the database.
  ${JSON.stringify(alreadyScrapedEvents, null, 2)}

  Newly scraped events:
  ${JSON.stringify(newEvents, null, 2)}

  Update the events that have not been scraped with the new events.
  `;

  const response = await callOpenRouterModelNoImage(prompt, model);
  console.log(response);
  const events = extractAndValidateJson(response, eventSchema);
  const normalizedEvents = events.map((event) => ({
    ...event,
    dateTime: event.dateTime ? new Date(event.dateTime) : null,
    rawText: event.rawText,
    extractedTitle: event.extractedTitle,
    location: event.location,
    additionalInfo: event.additionalInfo,
    imageUrl: event.imageUrl,
    repeating: event.repeating,
    eventUrl: event.eventUrl,
  }));
  return normalizedEvents;
}
