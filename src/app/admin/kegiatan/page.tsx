"use client"

import { useState, useMemo } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { KegiatanForm } from "@/components/admin/KegiatanForm"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Pagination } from "@/components/ui/Pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Search, Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react"
import { mockKegiatan } from "@/lib/mock-data"
import type { Kegiatan } from "@/types"

const PER_PAGE = 8

const kategoriBadge: Record<string, "default" | "success" | "warning" | "info"> = {
  acara: "info", pelatihan: "success", sosial: "warning", lainnya: "default",
}

export default function AdminKegiatanPage() {
  const [items, setItems] = useState(mockKegiatan)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Kegiatan | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    if (!search) return items
    const q = search.toLowerCase()
    return items.filter((k) => k.judul.toLowerCase().includes(q) || k.deskripsi.toLowerCase().includes(q))
  }, [items, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openCreate = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const openEdit = (item: Kegiatan) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const handleSave = (data: Partial<Kegiatan>) => {
    setLoading(true)
    setTimeout(() => {
      if (editItem) {
        setItems((prev) => prev.map((k) => (k.id === editItem.id ? { ...k, ...data, updatedAt: new Date().toISOString() } as Kegiatan : k)))
      } else {
        const newItem: Kegiatan = {
          id: String(Date.now()),
          judul: data.judul || "",
          slug: (data.judul || "").toLowerCase().replace(/\s+/g, "-"),
          deskripsi: data.deskripsi || "",
          konten: data.konten || "",
          kategori: (data.kategori as Kegiatan["kategori"]) || "lainnya",
          tanggal: data.tanggal || "",
          lokasi: data.lokasi || "",
          foto: data.foto || [],
          status: (data.status as Kegiatan["status"]) || "draft",
          penulisId: "1",
          dendaAlpha: data.dendaAlpha || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        setItems((prev) => [newItem, ...prev])
      }
      setModalOpen(false)
      setLoading(false)
    }, 500)
  }

  const handleDelete = () => {
    if (!deleteId) return
    setLoading(true)
    setTimeout(() => {
      setItems((prev) => prev.filter((k) => k.id !== deleteId))
      setDeleteId(null)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <PageHeader
        title="Kegiatan"
        description="Kelola semua kegiatan Karang Taruna"
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kegiatan
          </Button>
        }
      />

      <div className="mb-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((k) => (
          <div key={k.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-base font-semibold text-gray-900">{k.judul}</span>
              <Badge variant={k.status === "published" ? "success" : "warning"} className="shrink-0">
                {k.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant={kategoriBadge[k.kategori]}>{k.kategori}</Badge>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(k.tanggal).toLocaleDateString("id-ID")}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {k.lokasi}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
              <button onClick={() => openEdit(k)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button onClick={() => setDeleteId(k.id)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600">
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada kegiatan ditemukan</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={page} total={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Kegiatan" : "Tambah Kegiatan"}</DialogTitle>
          </DialogHeader>
          <KegiatanForm initial={editItem || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} loading={loading} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  )
}
