import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

export const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'URL Scraper Dashboard',
  description: 'Manage and view scraped URLs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

