"use client"

import { useState, useMemo } from "react"
import { PageBanner } from "@/components/landing/PageBanner"
import { PostFilterBar } from "@/components/posts/PostFilterBar"
import { PostGrid } from "@/components/posts/PostGrid"
import { Pagination } from "@/components/ui/Pagination"
import { mockPosts } from "@/lib/mock-data"

const PER_PAGE = 6

export default function PostsPage() {
  const [filters, setFilters] = useState({ kategori: "", search: "" })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let items = mockPosts.filter((p) => p.status === "published")
    if (filters.kategori) {
      items = items.filter((p) => p.kategori === filters.kategori)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      items = items.filter(
        (p) =>
          p.judul.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return items
  }, [filters])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilterChange = (newFilters: { kategori: string; search: string }) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <>
      <PageBanner title="Artikel" description="Berbagai informasi, berita, dan pengumuman terbaru dari Karang Taruna Sukamaju" />
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <PostFilterBar onFilterChange={handleFilterChange} />
          </div>
          <PostGrid items={paginated} />
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination current={page} total={totalPages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
