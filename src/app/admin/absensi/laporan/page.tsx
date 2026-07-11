"use client"

import { useState, useMemo } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/ui/Badge"
import { Users, UserCheck, UserX, UserMinus } from "lucide-react"
import { mockAbsensi, mockKegiatan, mockUsers } from "@/lib/mock-data"

export default function AdminAbsensiLaporanPage() {
  const now = new Date()
  const [dari, setDari] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`)
  const [sampai, setSampai] = useState(now.toISOString().split("T")[0])

  const kegitanRange = useMemo(
    () => mockKegiatan.filter((k) => k.tanggal >= dari && k.tanggal <= sampai && k.status === "published"),
    [dari, sampai],
  )

  const absensiRange = useMemo(
    () => mockAbsensi.filter((a) => kegitanRange.some((k) => k.id === a.kegiatanId)),
    [kegitanRange],
  )

  const rekapPerAnggota = useMemo(() => {
    return mockUsers
      .filter((u) => u.status === "aktif")
      .map((u) => {
        const absenUser = absensiRange.filter((a) => a.anggotaId === u.id)
        const totalDenda = absenUser
          .filter((a) => a.status === "alpha")
          .reduce((sum, a) => {
            const k = kegitanRange.find((keg) => keg.id === a.kegiatanId)
            return sum + (k?.dendaAlpha || 0)
          }, 0)
        return {
          nama: u.nama,
          hadir: absenUser.filter((a) => a.status === "hadir").length,
          izin: absenUser.filter((a) => a.status === "izin").length,
          alpha: absenUser.filter((a) => a.status === "alpha").length,
          totalDenda,
        }
      })
  }, [absensiRange, kegitanRange])

  const totalHadir = rekapPerAnggota.reduce((a, b) => a + b.hadir, 0)
  const totalIzin = rekapPerAnggota.reduce((a, b) => a + b.izin, 0)
  const totalAlpha = rekapPerAnggota.reduce((a, b) => a + b.alpha, 0)
  const totalDenda = rekapPerAnggota.reduce((a, b) => a + b.totalDenda, 0)
  const total = totalHadir + totalIzin + totalAlpha

  const columns: Column<(typeof rekapPerAnggota)[0]>[] = [
    { key: "nama", header: "Nama", cell: (r) => <span className="font-medium">{r.nama}</span> },
    { key: "hadir", header: "Hadir", cell: (r) => <Badge variant="success">{r.hadir}</Badge> },
    { key: "izin", header: "Izin", cell: (r) => <Badge variant="warning">{r.izin}</Badge> },
    { key: "alpha", header: "Alpha", cell: (r) => <Badge variant="danger">{r.alpha}</Badge> },
    { key: "totalDenda", header: "Total Denda", cell: (r) => `Rp${r.totalDenda.toLocaleString("id-ID")}` },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Laporan Absensi" description="Rekap kehadiran per tanggal" />

      <div className="flex items-center gap-2">
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{total}</p>
              <p className="text-xs text-gray-500">Total Kehadiran</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{totalHadir}</p>
              <p className="text-xs text-gray-500">Hadir</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <UserMinus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{totalIzin}</p>
              <p className="text-xs text-gray-500">Izin</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <UserX className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{totalAlpha}</p>
              <p className="text-xs text-gray-500">Alpha</p>
              <p className="text-[10px] text-red-500">Rp{totalDenda.toLocaleString("id-ID")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Rekap per Anggota — {dari ? new Date(dari).toLocaleDateString("id-ID") : "..."} s.d. {sampai ? new Date(sampai).toLocaleDateString("id-ID") : "..."}
        </h2>
        <DataTable columns={columns} data={rekapPerAnggota} />
      </div>
    </div>
  )
}
