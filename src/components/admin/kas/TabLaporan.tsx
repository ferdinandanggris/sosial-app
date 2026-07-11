"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { mockKasTransaksi } from "@/lib/mock-data"

export default function TabLaporan() {
  const now = new Date()
  const [dari, setDari] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`)
  const [sampai, setSampai] = useState(now.toISOString().split("T")[0])
  const [search, setSearch] = useState("")

  const transaksiRange = useMemo(
    () => mockKasTransaksi.filter((t) => t.tanggal >= dari && t.tanggal <= sampai),
    [dari, sampai],
  )

  const filtered = useMemo(() => {
    if (!search) return transaksiRange
    const q = search.toLowerCase()
    return transaksiRange.filter(
      (t) =>
        t.deskripsi.toLowerCase().includes(q) ||
        t.kategori.toLowerCase().includes(q) ||
        t.jenis.toLowerCase().includes(q),
    )
  }, [transaksiRange, search])

  const totalPemasukan = useMemo(
    () => filtered.filter((t) => t.jenis === "pemasukan").reduce((a, b) => a + b.jumlah, 0),
    [filtered],
  )

  const totalPengeluaran = useMemo(
    () => filtered.filter((t) => t.jenis === "pengeluaran").reduce((a, b) => a + b.jumlah, 0),
    [filtered],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={dari}
          onChange={(e) => setDari(e.target.value)}
          className="h-10 w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <span className="text-sm text-gray-400">—</span>
        <input
          type="date"
          value={sampai}
          onChange={(e) => setSampai(e.target.value)}
          className="h-10 w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <div className="relative flex-1" style={{ minWidth: 200 }}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalPemasukan.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Total Pemasukan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalPengeluaran.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Total Pengeluaran</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{(totalPemasukan - totalPengeluaran).toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Selisih</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Detail Transaksi — {dari ? new Date(dari).toLocaleDateString("id-ID") : "..."} s.d. {sampai ? new Date(sampai).toLocaleDateString("id-ID") : "..."}
        </h2>

        <div className="flex flex-col gap-3">
          {filtered.map((t) => (
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
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">Tidak ada transaksi ditemukan</p>
          )}
        </div>
      </div>
    </div>
  )
}
