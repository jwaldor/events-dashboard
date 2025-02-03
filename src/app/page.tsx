import UrlManager from '@/components/UrlManager'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">URL Scraper Dashboard</h1>
          <Link
            href="/events"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Events
          </Link>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-3xl mr-auto">
          <h2 className="text-lg font-semibold mb-2">Usage Notes:</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p>This event aggregator is meant to make it easy for you to view events from multiple sources in a single place.</p>
            <p className="font-medium mt-2">It comes with some limitations that are important to keep in mind:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>The scraper is able to do a good job with any URL that provides event information immediately on the page itself, without requiring you to click on links to view the events.</li>
              <li>For example, it would work well with a Luma page such as https://lu.ma/nyc that lists many events on a single page.</li>
              <li>It will not work with a page that requires you to click on links to view events.</li>
              <li>The scraper will be able to view the page down to a certain point, but there is a limit to how far down on the page it can see.</li>
              <li>The AI is not perfect and sometimes makes mistake on important event details. You&apos;ll be able to verify the details at the source URL of each event.</li>
            </ul>
          </div>
        </div>

        <UrlManager />
      </main>
    </div>
  )
}

