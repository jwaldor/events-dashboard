import { prisma } from "@/prismaClient";
import { Event } from "@prisma/client";
export async function createEvents(
  events: Omit<Event, "id" | "createdAt" | "updatedAt">[]
) {
  console.log("all events", events);
  const result = await prisma.event.createMany({
    data: events,
  });
  return result;
}

export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        parentUrl: true, // This will include the associated Url data
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
