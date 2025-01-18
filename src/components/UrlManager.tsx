'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface Url {
  id: string
  fullURL: string
}

export default function UrlManager() {
  const [urls, setUrls] = useState<Url[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls')
      if (!response.ok) throw new Error('Failed to fetch URLs')
      const data = await response.json()
      setUrls(data)
    } catch (error) {
      console.error('Error fetching URLs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch URLs. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddUrls = async () => {
    const urlsToAdd = input.split('\n').filter(url => url.trim() !== '')
    if (urlsToAdd.length === 0) return

    try {
      const response = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: urlsToAdd }),
      })

      if (!response.ok) throw new Error('Failed to add URLs')

      setInput('')
      fetchUrls()
      toast({
        title: "Success",
        description: "URLs added successfully.",
      })
    } catch (error) {
      console.error('Error adding URLs:', error)
      toast({
        title: "Error",
        description: "Failed to add URLs. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUrl = async (fullURL: string) => {
    try {
      const response = await fetch('/api/urls', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullURL }),
      })

      if (!response.ok) throw new Error('Failed to delete URL')

      fetchUrls()
      toast({
        title: "Success",
        description: "URL deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting URL:', error)
      toast({
        title: "Error",
        description: "Failed to delete URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add URLs</h2>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URLs (one per line)"
            className="flex-grow"
            multiline
            rows={3}
          />
          <Button onClick={handleAddUrls}>Add</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Scraped URLs</h2>
        {urls.length === 0 ? (
          <p className="text-gray-500">No URLs added yet.</p>
        ) : (
          <ul className="space-y-2">
            {urls.map((url) => (
              <li key={url.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow">
                <span className="truncate flex-grow mr-4">{url.fullURL}</span>
                <Button
                  onClick={() => handleDeleteUrl(url.fullURL)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

