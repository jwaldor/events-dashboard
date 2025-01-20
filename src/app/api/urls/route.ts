import { NextResponse } from "next/server";
import { createUrls, getUrls, deleteUrl } from "@/services/url";
import { initiallyScrapeUrl } from "@/services/scrape";
import { createEvents } from "@/services/events";

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required" },
        { status: 400 }
      );
    }

    const result = await createUrls(urls);
    console.log(result);
    (async () => {
      const events = await Promise.all(
        result.map(async (url) => ({
          parentUrlId: url.id,
          events: await initiallyScrapeUrl(url.fullURL),
        }))
      );
      const flattenedEvents = events
        .map((event) =>
          event.events.map((e) => ({
            parentUrlId: event.parentUrlId,
            rawText: e.rawText,
            eventUrl: e.eventUrl,
            extractedTitle: e.extractedTitle,
            location: e.location,
            dateTime: e.dateTime ? new Date(e.dateTime) : null,
            repeating: e.repeating,
            additionalInfo: e.additionalInfo,
            imageUrl: e.imageUrl,
          }))
        )
        .flat();
      // await createEvents(
      //   {
      //     parentUrlId: 1,
      //     extractedTitle: "test",
      //     eventUrl: "test",
      //     location: "test",
      //     dateTime: new Date(),
      //     repeating: false,
      //     additionalInfo: "test",
      //     imageUrl: "test",
      //   },
      // ]);
      await createEvents(flattenedEvents);
    })();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to create URLs" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const urls = await getUrls();
    return NextResponse.json(urls);
  } catch (error) {
    console.error("Error in GET /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { fullURL } = await request.json();

    if (!fullURL) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const result = await deleteUrl(fullURL);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in DELETE /api/urls:", error);
    return NextResponse.json(
      { error: "Failed to delete URL" },
      { status: 500 }
    );
  }
}
