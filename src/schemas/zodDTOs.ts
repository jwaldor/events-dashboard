import { Event } from "@prisma/client";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

type GeneratedEvent = Omit<
  Event,
  "id" | "createdAt" | "updatedAt" | "parentUrlId"
>;

export const eventSchema = z
  .array(
    z.object({
      rawText: z
        .string()
        .describe("The raw text that comprises the event listing"),
      repeating: z
        .union([z.boolean(), z.null()])
        .describe(
          "Whether the event is repeating (e.g. it has a recurring date, or it occurs over a range of dates)"
        ),
      eventUrl: z
        .union([z.string(), z.null()])
        .describe("The URL of the event, if provided"),
      extractedTitle: z
        .union([z.string(), z.null()])
        .describe("The title of the event, if provided"),
      location: z
        .union([z.string(), z.null()])
        .describe("The location of the event, if provided"),
      dateTime: z
        .union([z.string().datetime(), z.null()])
        .describe(
          "The date and time of the event, if provided. If time is not provided, you can make it midnight. If time zone is not provided, you can make it UTC."
        ),
      additionalInfo: z
        .union([z.string(), z.null()])
        .describe("Additional information about the event, if extracted"),
      imageUrl: z
        .union([z.string(), z.null()])
        .describe(
          "The image URL that is clearly associated with the event, if provided"
        ),
    })
  )
  .describe("An array containing all of the events extracted from the page");

export type EventSchema = z.infer<typeof eventSchema>;

console.log(JSON.stringify(zodToJsonSchema(eventSchema), null, 2));
