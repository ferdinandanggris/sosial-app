"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/PageHeader"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Pagination } from "@/components/ui/Pagination"
import { Plus, Minus, Plus as PlusIcon, Eye, Search, Lock, Unlock, Calendar, Users } from "lucide-react"
import { mockPinjamanProgram, mockPinjaman, mockUsers, mockSettings } from "@/lib/mock-data"
import type { PinjamanProgram, Pinjaman } from "@/types"

const PER_PAGE = 10

export default function AdminPinjamanListPage() {
  const [programs, setPrograms] = useState(mockPinjamanProgram)
  const [allPinjaman, setAllPinjaman] = useState(mockPinjaman)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmTarget, setConfirmTarget] = useState<{ id: string; action: "tutup" | "buka" } | null>(null)

  const [namaProgram, setNamaProgram] = useState("")
  const [tenor, setTenor] = useState("6")
  const [unitPerAnggota, setUnitPerAnggota] = useState<Record<string, number>>({})

  const defaultJumlah = mockSettings.find((s) => s.key === "pinjaman.defaultJumlah")?.value || 100000
  const bunga = mockSettings.find((s) => s.key === "pinjaman.bunga")?.value || 2500
  const denda = mockSettings.find((s) => s.key === "pinjaman.denda")?.value || 5000
  const anggotaAktif = mockUsers.filter((u) => u.status === "aktif")

  const filtered = useMemo(() => {
    if (!search) return programs
    const q = search.toLowerCase()
    return programs.filter((p) => p.nama.toLowerCase().includes(q))
  }, [programs, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openCreate = () => {
    setNamaProgram("")
    setTenor("6")
    setUnitPerAnggota(Object.fromEntries(anggotaAktif.map((u) => [u.id, 0])))
    setCreateOpen(true)
  }

  const adjustUnit = (id: string, delta: number) => {
    setUnitPerAnggota((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }))
  }

  const totalUnit = Object.values(unitPerAnggota).reduce((a, b) => a + b, 0)
  const totalNilai = totalUnit * defaultJumlah

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const programId = `pp-${Date.now()}`
      const newProgram: PinjamanProgram = {
        id: programId,
        nama: namaProgram || "Program Baru",
        tanggalBuka: new Date().toISOString().split("T")[0],
        tenor: Number(tenor),
        bungaPerUnit: bunga,
        denda,
        status: "aktif",
      }
      setPrograms((prev) => [newProgram, ...prev])

      const newPinjaman: Pinjaman[] = Object.entries(unitPerAnggota)
        .filter(([_, unit]) => unit > 0)
        .map(([anggotaId, unit]) => ({
          id: `p-${Date.now()}-${anggotaId}`,
          programId,
          anggotaId,
          jumlahPinjaman: unit * defaultJumlah,
          sisaPinjaman: unit * defaultJumlah,
          unit,
        }))
      setAllPinjaman((prev) => [...newPinjaman, ...prev])

      setCreateOpen(false)
      setLoading(false)
    }, 500)
  }

  const handleToggleStatus = () => {
    if (!confirmTarget) return
    setLoading(true)
    setTimeout(() => {
      setPrograms((prev) =>
        prev.map((p) =>
          p.id === confirmTarget.id
            ? { ...p, status: confirmTarget.action === "tutup" ? "ditutup" : "aktif", tanggalTutup: confirmTarget.action === "tutup" ? new Date().toISOString().split("T")[0] : undefined }
            : p,
        ),
      )
      setConfirmTarget(null)
      setLoading(false)
    }, 300)
  }

  return (
    <div>
      <PageHeader title="Program Pinjaman" description="Kelola program pinjaman anggota" action={
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Program Baru
        </Button>
      } />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari program..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginated.map((p) => {
          const jmlAnggota = allPinjaman.filter((pi) => pi.programId === p.id).length
          const totalUnit = allPinjaman.filter((pi) => pi.programId === p.id).reduce((a, b) => a + b.unit, 0)
          return (
            <div key={p.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-base font-semibold text-gray-900">{p.nama}</span>
                <Badge variant={p.status === "aktif" ? "success" : "default"} className="shrink-0">{p.status}</Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(p.tanggalBuka).toLocaleDateString("id-ID")}
                </span>
                <span>{p.tenor} bln</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {jmlAnggota} anggota
                </span>
                <span>{totalUnit} unit</span>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <Link href={`/admin/simpan-pinjam/pinjaman/${p.id}`}>
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Eye className="h-3 w-3" />
                    Detail
                  </Button>
                </Link>
                {p.status === "aktif" ? (
                  <Button size="sm" variant="secondary" className="gap-1 text-red-600 hover:bg-red-50" onClick={() => setConfirmTarget({ id: p.id, action: "tutup" })}>
                    <Lock className="h-3 w-3" />
                    Tutup
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" className="gap-1" onClick={() => setConfirmTarget({ id: p.id, action: "buka" })}>
                    <Unlock className="h-3 w-3" />
                    Buka
                  </Button>
                )}
              </div>
            </div>
          )
        })}
        {paginated.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada program ditemukan</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination current={page} total={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Buka Program Pinjaman Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input label="Nama Program" value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} required placeholder="Contoh: Program Arisan Lebaran" />
            <Input label="Tenor (bulan)" type="number" value={tenor} onChange={(e) => setTenor(e.target.value)} required min={1} />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Daftar Anggota <span className="text-xs text-gray-400">(1 unit = Rp{defaultJumlah.toLocaleString("id-ID")})</span>
              </label>
              <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2">
                {anggotaAktif.map((u) => {
                  const unit = unitPerAnggota[u.id] || 0
                  return (
                    <div key={u.id} className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-50">
                      <span className="text-sm text-gray-900">{u.nama}</span>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => adjustUnit(u.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">{unit}</span>
                        <button type="button" onClick={() => adjustUnit(u.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-primary-600 hover:bg-primary-50">
                          <PlusIcon className="h-3 w-3" />
                        </button>
                        <span className="w-16 text-right text-xs text-gray-500">
                          {unit > 0 ? `Rp${(unit * defaultJumlah).toLocaleString("id-ID")}` : "—"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 text-sm">
              Total: <strong>{totalUnit} unit</strong> = <strong>Rp{totalNilai.toLocaleString("id-ID")}</strong>
              <span className="text-xs text-gray-500"> &middot; {Object.values(unitPerAnggota).filter((v) => v > 0).length} anggota</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)} disabled={loading}>Batal</Button>
              <Button type="submit" loading={loading} disabled={totalUnit === 0}>Buka Program</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmTarget !== null} onOpenChange={(o) => { if (!o) setConfirmTarget(null) }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{confirmTarget?.action === "tutup" ? "Tutup Program" : "Buka Kembali Program"}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            {confirmTarget?.action === "tutup"
              ? "Program yang ditutup tidak bisa menerima pembayaran baru. Lanjutkan?"
              : "Buka kembali program ini untuk melanjutkan pembayaran?"}
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setConfirmTarget(null)} disabled={loading}>Batal</Button>
            <Button onClick={handleToggleStatus} loading={loading} variant={confirmTarget?.action === "tutup" ? "danger" : "primary"}>
              {confirmTarget?.action === "tutup" ? "Tutup" : "Buka"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
