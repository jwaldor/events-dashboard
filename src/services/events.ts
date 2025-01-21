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
