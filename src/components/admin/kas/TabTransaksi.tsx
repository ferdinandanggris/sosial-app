"use client"

import { useState, useMemo } from "react"
import { KasForm } from "@/components/admin/KasForm"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select } from "@/components/ui/Select"
import { Pagination } from "@/components/ui/Pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Plus, Pencil, Trash2, Search, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { mockKasTransaksi, recalculateSaldo } from "@/lib/mock-data"
import type { KasTransaksi } from "@/types"

const PER_PAGE = 10

const filterJenis = [
  { value: "", label: "Semua" },
  { value: "pemasukan", label: "Pemasukan" },
  { value: "pengeluaran", label: "Pengeluaran" },
]

export default function TabTransaksi() {
  const [items, setItems] = useState(mockKasTransaksi)
  const [search, setSearch] = useState("")
  const [filterJenisVal, setFilterJenisVal] = useState("")
  const [filterDari, setFilterDari] = useState("")
  const [filterSampai, setFilterSampai] = useState("")
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<KasTransaksi | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let result = items
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.deskripsi.toLowerCase().includes(q))
    }
    if (filterJenisVal) result = result.filter((t) => t.jenis === filterJenisVal)
    if (filterDari) result = result.filter((t) => t.tanggal >= filterDari)
    if (filterSampai) result = result.filter((t) => t.tanggal <= filterSampai)
    return result
  }, [items, search, filterJenisVal, filterDari, filterSampai])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openCreate = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const openEdit = (item: KasTransaksi) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const syncItems = (updated: KasTransaksi[]) => {
    setItems(updated)
    setModalOpen(false)
    setLoading(false)
  }

  const handleSave = (data: Partial<KasTransaksi>) => {
    setLoading(true)
    setTimeout(() => {
      if (editItem) {
        const idx = mockKasTransaksi.findIndex((t) => t.id === editItem.id)
        if (idx >= 0) Object.assign(mockKasTransaksi[idx], data)
        recalculateSaldo(mockKasTransaksi)
      } else {
        const newItem: KasTransaksi = {
          id: String(Date.now()),
          jenis: (data.jenis as KasTransaksi["jenis"]) || "pemasukan",
          kategori: data.kategori || "",
          jumlah: data.jumlah || 0,
          saldo: 0,
          deskripsi: data.deskripsi || "",
          tanggal: new Date().toISOString().split("T")[0],
          dicatatOleh: "4",
        }
        mockKasTransaksi.push(newItem)
        recalculateSaldo(mockKasTransaksi)
      }
      syncItems([...mockKasTransaksi])
    }, 500)
  }

  const handleDelete = (id: string) => {
    const idx = mockKasTransaksi.findIndex((t) => t.id === id)
    if (idx >= 0) mockKasTransaksi.splice(idx, 1)
    recalculateSaldo(mockKasTransaksi)
    setItems([...mockKasTransaksi])
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Transaksi
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div className="w-40">
          <Select options={filterJenis} value={filterJenisVal} onValueChange={(v) => { setFilterJenisVal(v); setPage(1) }} />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filterDari}
            onChange={(e) => { setFilterDari(e.target.value); setPage(1) }}
            className="h-10 w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder="Dari"
          />
          <span className="text-sm text-gray-400">—</span>
          <input
            type="date"
            value={filterSampai}
            onChange={(e) => { setFilterSampai(e.target.value); setPage(1) }}
            className="h-10 w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder="Sampai"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((t) => (
          <div key={t.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${t.jenis === "pemasukan" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {t.jenis === "pemasukan" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.deskripsi}</p>
                  <p className="text-xs text-gray-500">{new Date(t.tanggal).toLocaleDateString("id-ID")}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold ${t.jenis === "pemasukan" ? "text-green-600" : "text-red-600"}`}>
                  {t.jenis === "pemasukan" ? "+" : "-"}Rp{t.jumlah.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-400">Saldo: Rp{t.saldo.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={t.jenis === "pemasukan" ? "success" : "danger"}>{t.jenis}</Badge>
              <span className="text-xs text-gray-500">{t.kategori}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
              <button onClick={() => openEdit(t)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600">
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada transaksi ditemukan</p>
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
            <DialogTitle>{editItem ? "Edit Transaksi" : "Tambah Transaksi"}</DialogTitle>
          </DialogHeader>
          <KasForm initial={editItem || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} loading={loading} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
