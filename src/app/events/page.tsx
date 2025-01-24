import EventList from "@/components/EventList"
import SearchBar from "@/components/SearchBar"
import type { Event } from "@/types/event"

async function fetchEvents(): Promise<Event[]> {
    const res = await fetch("http://localhost:3000/api/events", { next: { revalidate: 60 } })
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
            <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
            <SearchBar />
            {error ? <div className="text-red-500">{error}</div> : <EventList events={events} />}
        </div>
    )
}



