import { NextResponse } from "next/server";
import {
  updateScrapeUrlImage,
  initiallyScrapeUrlImage,
} from "@/services/scrape";
import { getAllEvents } from "@/services/events";
import { getUrls } from "@/services/url";
import { MODEL } from "@/config";
export async function GET() {
  const alreadyScrapedEvents = await getAllEvents();
  const urls = await getUrls();
  const newEvents = await Promise.all(
    urls.map(async (url: { id: number; fullURL: string }) => {
      const newEvents = await initiallyScrapeUrlImage(url.fullURL, MODEL);
      const newEventsTransformed = newEvents.map((event) => {
        return {
          parentUrlId: url.id,
          rawText: event.rawText,
          eventUrl: event.eventUrl,
          extractedTitle: event.extractedTitle,
          location: event.location,
          dateTime: event.dateTime ? new Date(event.dateTime) : null,
          repeating: event.repeating,
          additionalInfo: event.additionalInfo,
          imageUrl: event.imageUrl,
        };
      });
      const eventsToUpdate = await updateScrapeUrlImage(
        newEventsTransformed,
        alreadyScrapedEvents,
        MODEL
      );
      return eventsToUpdate;
    })
  );
  return NextResponse.json(newEvents);
}
