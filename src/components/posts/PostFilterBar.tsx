"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const kategoriList = [
  { value: "", label: "Semua" },
  { value: "artikel", label: "Artikel" },
  { value: "berita", label: "Berita" },
  { value: "pengumuman", label: "Pengumuman" },
]

interface PostFilterBarProps {
  onFilterChange: (filters: { kategori: string; search: string }) => void
}

function PostFilterBar({ onFilterChange }: PostFilterBarProps) {
  const [activeKategori, setActiveKategori] = useState("")
  const [search, setSearch] = useState("")

  const handleKategoriClick = (value: string) => {
    setActiveKategori(value)
    onFilterChange({ kategori: value, search })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onFilterChange({ kategori: activeKategori, search: value })
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari postingan..."
          value={search}
          onChange={handleSearchChange}
          className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {kategoriList.map((kat) => (
          <button
            key={kat.value}
            onClick={() => handleKategoriClick(kat.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeKategori === kat.value
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            {kat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export { PostFilterBar }
