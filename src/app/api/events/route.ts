import { NextResponse } from "next/server";
import { getAllEvents } from "@/services/events";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error in GET /api/events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
