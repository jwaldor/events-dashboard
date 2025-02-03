import EventList from "@/components/EventList"
// import SearchBar from "@/components/SearchBar"
import type { Event } from "@/types/event"
import Link from "next/link"

async function fetchEvents(): Promise<Event[]> {
    const res = await fetch("/api/events", { next: { revalidate: 60 } })
    if (!res.ok) {
        throw new Error("Failed to fetch events")
    }
    return res.json()
}

export default async function EventsPage() {
    let events: Event[] = []
    let error: string | null = null

    try {
        events = await fetchEvents()
    } catch (e) {
        error = e instanceof Error ? e.message : "An error occurred while fetching events"
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h2 className="text-lg font-semibold mb-2">Usage Notes:</h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>AI can make mistakes. Verify that the location and time information of each event is correct before attending.</li>
                </ul>
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Upcoming Events</h1>
                <Link
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Got to URL Manager
                </Link>
            </div>
            {/* <SearchBar /> */}
            {error ? <div className="text-red-500">{error}</div> : <EventList events={events} />}
        </div>
    )
}



