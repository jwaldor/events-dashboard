import { Event } from "@prisma/client";
import { z } from "zod";
import { toZod } from "tozod";

type GeneratedEvent = Omit<
  Event,
  "id" | "createdAt" | "updatedAt" | "parentUrlId"
>;

export const eventSchema = z.object({
  rawText: z.string().describe("The raw text that comprises the event listing"),
  eventUrl: z.string().optional().describe("The URL of the event, if provided"),
  extractedTitle: z
    .string()
    .optional()
    .describe("The title of the event, if provided"),
  location: z
    .string()
    .optional()
    .describe("The location of the event, if provided"),
  dateTime: z
    .date()
    .optional()
    .describe("The date and time of the event, if provided"),
  repeating: z
    .boolean()
    .optional()
    .describe(
      "Whether the event is repeating (e.g. it has a recurring date, or it occurs over a range of dates)"
    ),
  additionalInfo: z
    .string()
    .optional()
    .describe("Additional information about the event, if extracted"),
  imageUrl: z
    .string()
    .optional()
    .describe(
      "The image URL that is clearly associated with the event, if provided"
    ),
});
