import EventCard from "./EventCard"
import type { Event } from "@/types/event"

export default function EventList({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <div className="text-center text-gray-500">No events found.</div>
  }

  const sortedEvents = events.sort((a, b) => {
    if (a.dateTime && b.dateTime) {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    }
    return 0
  })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedEvents.map((event) => (
        <div className="py-1" key={event.id}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  )
}

