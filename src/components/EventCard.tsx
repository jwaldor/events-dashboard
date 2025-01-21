import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/types/event"

export default function EventCard({ event }: { event: Event }) {
  const linkUrl = event.eventUrl || event.parentUrl?.fullURL || "#"

  return (
    <Link href={linkUrl} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {event.imageUrl && (
          <img
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.extractedTitle || "Event"}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{event.extractedTitle || "Untitled Event"}</h2>
          {event.dateTime && (
            <p className="text-gray-600 mb-2 flex items-center">
              <CalendarDays className="mr-2" size={16} />
              {new Date(event.dateTime).toLocaleString()}
            </p>
          )}
          {event.location && (
            <p className="text-gray-600 mb-2 flex items-center">
              <MapPin className="mr-2" size={16} />
              {event.location}
            </p>
          )}
          {event.additionalInfo && <p className="text-gray-700 mt-2">{event.additionalInfo}</p>}
        </div>
      </div>
    </Link>
  )
}

