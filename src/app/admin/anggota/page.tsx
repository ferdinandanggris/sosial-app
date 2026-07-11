"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/PageHeader"
import { AnggotaForm } from "@/components/admin/AnggotaForm"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Pagination } from "@/components/ui/Pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Plus, Pencil, Trash2, Search, Calendar, Eye, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { mockUsers, mockKasTransaksi } from "@/lib/mock-data"
import type { User } from "@/types"

const PER_PAGE = 8

const roleBadge: Record<string, "default" | "success" | "warning" | "info"> = {
  admin: "info", bendahara: "success", sekretaris: "warning", member: "default",
}

export default function AdminAnggotaPage() {
  const saldo = useMemo(() => {
    const pemasukan = mockKasTransaksi.filter((t) => t.jenis === "pemasukan").reduce((a, b) => a + b.jumlah, 0)
    const pengeluaran = mockKasTransaksi.filter((t) => t.jenis === "pengeluaran").reduce((a, b) => a + b.jumlah, 0)
    return pemasukan - pengeluaran
  }, [])
  const [items, setItems] = useState(mockUsers)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<User | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    if (!search) return items
    const q = search.toLowerCase()
    return items.filter((u) => u.nama.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }, [items, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openCreate = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const openEdit = (item: User) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const handleSave = (data: Partial<User>) => {
    setLoading(true)
    setTimeout(() => {
      if (editItem) {
        setItems((prev) => prev.map((u) => (u.id === editItem.id ? { ...u, ...data } as User : u)))
      } else {
        const newItem: User = {
          id: String(Date.now()),
          nama: data.nama || "",
          email: data.email || "",
          roles: data.roles || ["member"],
          noHp: data.noHp || "",
          alamat: data.alamat || "",
          tanggalBergabung: new Date().toISOString().split("T")[0],
          status: (data.status as User["status"]) || "aktif",
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
      setItems((prev) => prev.filter((u) => u.id !== deleteId))
      setDeleteId(null)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <PageHeader
        title="Anggota"
        description="Kelola data anggota Karang Taruna"
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Anggota
          </Button>
        }
      />

      <Card className="mb-4">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Rp{saldo.toLocaleString("id-ID")}</p>
            <p className="text-xs text-gray-500">Saldo Kas Saat Ini</p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari anggota..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((u) => (
          <div key={u.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 shrink-0">
                  {u.nama.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{u.nama}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>
              <Badge variant={u.status === "aktif" ? "success" : "danger"} className="shrink-0">
                {u.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {u.roles.map((r) => (
                <Badge key={r} variant={roleBadge[r]}>{r}</Badge>
              ))}
              <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(u.tanggalBergabung).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
              <Link
                href={`/admin/anggota/${u.id}`}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600"
              >
                <Eye className="h-3.5 w-3.5" />
                Detail
              </Link>
              <button onClick={() => openEdit(u)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button onClick={() => setDeleteId(u.id)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600">
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada anggota ditemukan</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={page} total={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Anggota" : "Tambah Anggota"}</DialogTitle>
          </DialogHeader>
          <AnggotaForm initial={editItem || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} loading={loading} />
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
