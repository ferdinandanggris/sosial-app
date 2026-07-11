"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select } from "@/components/ui/Select"
import { Pagination } from "@/components/ui/Pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Eye, User } from "lucide-react"
import { mockTagihan, mockUsers } from "@/lib/mock-data"
import type { Tagihan } from "@/types"

const PER_PAGE = 10

const filterStatus = [
  { value: "", label: "Semua Status" },
  { value: "belum_dibayar", label: "Belum Dibayar" },
  { value: "lunas", label: "Lunas" },
]

export default function TabTagihan() {
  const [items, setItems] = useState(mockTagihan)
  const [filterStatusVal, setFilterStatusVal] = useState("")
  const [filterAnggota, setFilterAnggota] = useState("")
  const [page, setPage] = useState(1)
  const [detailItem, setDetailItem] = useState<Tagihan | null>(null)

  const filtered = useMemo(() => {
    let result = items
    if (filterStatusVal) result = result.filter((t) => t.status === filterStatusVal)
    if (filterAnggota) result = result.filter((t) => t.anggotaId === filterAnggota)
    return result
  }, [items, filterStatusVal, filterAnggota])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleBayar = (id: string) => {
    setItems((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "lunas" as const, lunasAt: new Date().toISOString().split("T")[0] } : t,
      ),
    )
  }

  const anggotaFilterOptions = [
    { value: "", label: "Semua Anggota" },
    ...mockUsers.map((u) => ({ value: u.id, label: u.nama })),
  ]

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-44">
          <Select options={filterStatus} value={filterStatusVal} onValueChange={(v) => { setFilterStatusVal(v); setPage(1) }} />
        </div>
        <div className="w-48">
          <Select options={anggotaFilterOptions} value={filterAnggota} onValueChange={(v) => { setFilterAnggota(v); setPage(1) }} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((t) => {
          const anggota = mockUsers.find((u) => u.id === t.anggotaId)
          return (
            <div key={t.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{anggota?.nama || "—"}</p>
                    <p className="text-xs text-gray-500 capitalize">{t.jenis.replace(/_/g, " ")}</p>
                  </div>
                </div>
                <Badge variant={t.status === "lunas" ? "success" : "warning"} className="shrink-0">
                  {t.status === "lunas" ? "Lunas" : "Belum Dibayar"}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Rp{t.jumlah.toLocaleString("id-ID")}</span>
                {t.kegiatanId && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-gray-500">Kegiatan: {t.kegiatanId}</span>
                  </>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <Button size="sm" variant="secondary" className="gap-1" onClick={() => setDetailItem(t)}>
                  <Eye className="h-3 w-3" />
                  Detail
                </Button>
                {t.status === "belum_dibayar" && (
                  <Button size="sm" onClick={() => handleBayar(t.id)}>Bayar</Button>
                )}
              </div>
            </div>
          )
        })}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada tagihan ditemukan</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={page} total={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Dialog open={detailItem !== null} onOpenChange={(o) => { if (!o) setDetailItem(null) }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Detail Tagihan</DialogTitle>
          </DialogHeader>
          {detailItem && (() => {
            const anggota = mockUsers.find((u) => u.id === detailItem.anggotaId)
            return (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Anggota</span>
                  <span className="font-medium text-gray-900">{anggota?.nama || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Jenis</span>
                  <span className="font-medium text-gray-900 capitalize">{detailItem.jenis.replace(/_/g, " ")}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Jumlah</span>
                  <span className="font-medium text-gray-900">Rp{detailItem.jumlah.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Kegiatan</span>
                  <span className="font-medium text-gray-900">{detailItem.kegiatanId || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Status</span>
                  <Badge variant={detailItem.status === "lunas" ? "success" : "warning"}>
                    {detailItem.status === "lunas" ? "Lunas" : "Belum Dibayar"}
                  </Badge>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Dibuat</span>
                  <span className="font-medium text-gray-900">{new Date(detailItem.createdAt).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500">Lunas</span>
                  <span className="font-medium text-gray-900">{detailItem.lunasAt ? new Date(detailItem.lunasAt).toLocaleDateString("id-ID") : "—"}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500">ID</span>
                  <span className="font-mono text-xs text-gray-500">{detailItem.id}</span>
                </div>
              </div>
            )
          })()}
          <div className="flex justify-end pt-2">
            <Button variant="secondary" onClick={() => setDetailItem(null)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
