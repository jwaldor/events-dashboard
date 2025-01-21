export interface Event {
  id: number
  rawText: string
  parentUrl: {
    fullURL: string
  }
  createdAt: string
  updatedAt: string
  extractedTitle: string | null
  location: string | null
  dateTime: string | null
  repeating: boolean | null
  additionalInfo: string | null
  imageUrl: string | null
  eventUrl: string | null
}

