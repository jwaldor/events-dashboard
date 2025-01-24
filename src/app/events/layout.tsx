import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Event Viewer",
    description: "View and search upcoming events",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={inter.className}>{children}</div>
    )
}
