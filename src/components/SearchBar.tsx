import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-3 pl-10 pr-4 text-gray-900 border rounded-lg outline-none focus:border-blue-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}

