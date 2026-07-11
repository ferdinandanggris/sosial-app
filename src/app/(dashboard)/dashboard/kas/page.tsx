"use client"

import { useMemo, useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Wallet, CheckCircle2, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, FileText } from "lucide-react"
import { mockTagihan, mockKasTransaksi } from "@/lib/mock-data"

type Tab = "tagihan" | "riwayat" | "laporan"

export default function DashboardKasPage() {
  const user = useAuthStore((s) => s.user)
  const [tab, setTab] = useState<Tab>("tagihan")
  const today = new Date().toISOString().split("T")[0]
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const saldoKas = useMemo(() => {
    const pemasukan = mockKasTransaksi.filter((t) => t.jenis === "pemasukan").reduce((a, b) => a + b.jumlah, 0)
    const pengeluaran = mockKasTransaksi.filter((t) => t.jenis === "pengeluaran").reduce((a, b) => a + b.jumlah, 0)
    return pemasukan - pengeluaran
  }, [])

  const tagihanSaya = useMemo(
    () => mockTagihan.filter((t) => t.anggotaId === user?.id),
    [user?.id],
  )

  const tagihanBelumDibayar = useMemo(
    () => tagihanSaya.filter((t) => t.status === "belum_dibayar"),
    [tagihanSaya],
  )

  const totalBelumDibayar = useMemo(
    () => tagihanBelumDibayar.reduce((a, b) => a + b.jumlah, 0),
    [tagihanBelumDibayar],
  )

  const totalSudahDibayar = useMemo(
    () => tagihanSaya.filter((t) => t.status === "lunas").reduce((a, b) => a + b.jumlah, 0),
    [tagihanSaya],
  )

  const riwayatPembayaran = useMemo(
    () => mockKasTransaksi.filter((t) => t.anggotaId === user?.id && t.jenis === "pemasukan").slice(-10).reverse(),
    [user?.id],
  )

  const transaksiFiltered = useMemo(() => {
    let data = [...mockKasTransaksi]
    if (dateFrom) data = data.filter((t) => t.tanggal >= dateFrom)
    if (dateTo) data = data.filter((t) => t.tanggal <= dateTo)
    return data.sort((a, b) => b.tanggal.localeCompare(a.tanggal))
  }, [dateFrom, dateTo])

  const laporanStats = useMemo(() => {
    const filtered = transaksiFiltered.length > 0 ? transaksiFiltered : mockKasTransaksi
    const pemasukan = filtered.filter((t) => t.jenis === "pemasukan").reduce((a, b) => a + b.jumlah, 0)
    const pengeluaran = filtered.filter((t) => t.jenis === "pengeluaran").reduce((a, b) => a + b.jumlah, 0)
    return { pemasukan, pengeluaran, saldo: pemasukan - pengeluaran }
  }, [transaksiFiltered])

  const tabs: { key: Tab; label: string }[] = [
    { key: "tagihan", label: "Tagihan" },
    { key: "riwayat", label: "Riwayat" },
    { key: "laporan", label: "Laporan" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kas Arisan</h1>
        <p className="text-gray-500">Tagihan dan riwayat pembayaran</p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Rp{saldoKas.toLocaleString("id-ID")}</p>
            <p className="text-xs text-gray-500">Saldo Kas Saat Ini</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`pb-2 px-3 text-sm font-medium transition-colors ${tab === t.key ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "tagihan" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{tagihanSaya.length}</p>
                  <p className="text-xs text-gray-500">Total Tagihan</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Rp{totalBelumDibayar.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-500">Belum Dibayar</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Rp{totalSudahDibayar.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-500">Sudah Dibayar</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            {tagihanSaya.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">Tidak ada tagihan</p>
            ) : (
              tagihanSaya.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {t.status === "lunas" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 capitalize">{t.jenis.replace(/_/g, " ")}</p>
                      <p className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold text-gray-900">Rp{t.jumlah.toLocaleString("id-ID")}</p>
                    <Badge variant={t.status === "lunas" ? "success" : "warning"} className="text-[10px]">{t.status === "lunas" ? "Lunas" : "Belum"}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "riwayat" && (
        <div className="space-y-2">
          {riwayatPembayaran.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">Belum ada riwayat pembayaran</p>
          ) : (
            riwayatPembayaran.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{t.deskripsi}</p>
                  <p className="text-xs text-gray-500">{new Date(t.tanggal).toLocaleDateString("id-ID")}</p>
                </div>
                <p className="text-sm font-semibold text-green-600 shrink-0 ml-2">+Rp{t.jumlah.toLocaleString("id-ID")}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "laporan" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs flex-1" />
            <span className="text-gray-400">—</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} max={today} className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs flex-1" />
          </div>

          <div className="flex flex-col gap-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Rp{laporanStats.pemasukan.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-500">Pemasukan</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <ArrowDownRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Rp{laporanStats.pengeluaran.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-500">Pengeluaran</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Rp{laporanStats.saldo.toLocaleString("id-ID")}</p>
                  <p className="text-xs text-gray-500">Sisa Saldo</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            {transaksiFiltered.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">Tidak ada transaksi</p>
            ) : (
              transaksiFiltered.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.jenis === "pemasukan" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {t.jenis === "pemasukan" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{t.deskripsi}</p>
                      <p className="text-xs text-gray-500 truncate">{t.kategori} &middot; {new Date(t.tanggal).toLocaleDateString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className={`text-sm font-semibold ${t.jenis === "pemasukan" ? "text-green-600" : "text-red-600"}`}>
                      {t.jenis === "pemasukan" ? "+" : "-"}Rp{t.jumlah.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-400">Rp{t.saldo.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
