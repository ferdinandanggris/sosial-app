"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/PageHeader"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Pagination } from "@/components/ui/Pagination"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"

const PER_PAGE = 10

const kategoriBadge: Record<string, "default" | "success" | "warning" | "info"> = {
  artikel: "info", berita: "success", pengumuman: "warning",
}

export default function AdminPostsPage() {
  const [items, setItems] = useState(mockPosts)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    if (!search) return items
    const q = search.toLowerCase()
    return items.filter((p) => p.judul.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
  }, [items, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleDelete = () => {
    if (!deleteId) return
    setLoading(true)
    setTimeout(() => {
      const idx = mockPosts.findIndex((p) => p.id === deleteId)
      if (idx >= 0) mockPosts.splice(idx, 1)
      setItems([...mockPosts])
      setDeleteId(null)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <PageHeader
        title="Posts"
        description="Kelola artikel, berita, dan pengumuman untuk publik"
        action={
          <Link href="/admin/posts/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Post
            </Button>
          </Link>
        }
      />

      <div className="mb-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari post..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((p) => (
          <div key={p.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/admin/posts/${p.id}/edit`}
                className="text-base font-semibold text-gray-900 transition-colors hover:text-primary-600"
              >
                {p.judul}
              </Link>
              <Badge variant={p.status === "published" ? "success" : "warning"} className="shrink-0">
                {p.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant={kategoriBadge[p.kategori]}>{p.kategori}</Badge>
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                  #{t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
              <Link
                href={`/admin/posts/${p.id}/edit`}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
              <button
                onClick={() => setDeleteId(p.id)}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada post yang ditemukan</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={page} total={totalPages} onPageChange={setPage} />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  )
}
