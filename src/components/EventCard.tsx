import { CalendarDays, ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/types/event"

export default function EventCard({ event }: { event: Event }) {
  const eventLinkUrl = event.eventUrl || "#"

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-48 flex flex-col relative">
      {event.parentUrl?.fullURL && (
        <Link
          href={event.parentUrl.fullURL}
          className="absolute top-0 right-0 bg-white/90 hover:bg-white px-3 py-1 rounded-full text-sm shadow-sm z-10 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ExternalLink size={16} />
        </Link>
      )}
      <Link href={eventLinkUrl} className={`block flex-1 ${!event.eventUrl && 'pointer-events-none'}`}>
        {event.imageUrl && (
          <img
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.extractedTitle || "Event"}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4 flex-1 overflow-hidden">
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
          {event.additionalInfo && (
            <p className="text-gray-700 mt-2 line-clamp-3">{event.additionalInfo}</p>
          )}
        </div>
      </Link>
    </div>
  )
}

