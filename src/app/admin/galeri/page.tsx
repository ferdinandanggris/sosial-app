"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { GaleriForm } from "@/components/admin/GaleriForm"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { EmptyState } from "@/components/ui/EmptyState"
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react"
import { mockGaleri } from "@/lib/mock-data"
import type { GaleriItem } from "@/types"

export default function AdminGaleriPage() {
  const [items, setItems] = useState(mockGaleri)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<GaleriItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const openCreate = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const openEdit = (item: GaleriItem) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const handleSave = (data: Partial<GaleriItem>) => {
    setLoading(true)
    setTimeout(() => {
      if (editItem) {
        setItems((prev) => prev.map((g) => (g.id === editItem.id ? { ...g, ...data } as GaleriItem : g)))
      } else {
        const newItem: GaleriItem = {
          id: String(Date.now()),
          url: data.url || "",
          caption: data.caption || "",
          kategori: data.kategori || "kegiatan",
          createdAt: new Date().toISOString().split("T")[0],
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
      setItems((prev) => prev.filter((g) => g.id !== deleteId))
      setDeleteId(null)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <PageHeader
        title="Galeri"
        description="Kelola foto dan dokumentasi kegiatan"
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Foto
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-12 w-12" />}
          message="Belum ada foto"
          description="Tambahkan foto pertama kamu"
          action={
            <Button onClick={openCreate} variant="secondary">
              Tambah Foto
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-blue-100">
              <div className="flex h-full items-center justify-center text-gray-400">
                <ImageIcon className="h-10 w-10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-lg bg-white p-2 text-gray-700 hover:bg-gray-100"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="rounded-lg bg-white p-2 text-red-600 hover:bg-red-50"
                  aria-label="Hapus"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-xs font-medium text-white truncate">{item.caption}</p>
                <p className="text-[10px] text-white/60">{item.kategori}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Foto" : "Tambah Foto"}</DialogTitle>
          </DialogHeader>
          <GaleriForm initial={editItem || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} loading={loading} />
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
