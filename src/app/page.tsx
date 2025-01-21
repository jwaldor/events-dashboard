import UrlManager from '@/components/UrlManager'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">URL Scraper Dashboard</h1>
        <UrlManager />
      </main>
    </div>
  )
}

