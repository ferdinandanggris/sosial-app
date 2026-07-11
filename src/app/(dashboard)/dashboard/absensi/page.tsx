"use client"

import { useMemo } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CheckCircle2, Clock, XCircle, Calendar } from "lucide-react"
import { mockAbsensi, mockKegiatan, mockTagihan } from "@/lib/mock-data"

export default function DashboardAbsensiPage() {
  const user = useAuthStore((s) => s.user)

  const absensiSaya = useMemo(
    () => mockAbsensi.filter((a) => a.anggotaId === user?.id),
    [user?.id],
  )

  const dendaBelumDibayar = useMemo(
    () => mockTagihan.filter((t) => t.anggotaId === user?.id && t.jenis === "denda_alpha" && t.status === "belum_dibayar"),
    [user?.id],
  )

  const totalDenda = useMemo(
    () => dendaBelumDibayar.reduce((a, b) => a + b.jumlah, 0),
    [dendaBelumDibayar],
  )

  const hadir = absensiSaya.filter((a) => a.status === "hadir").length
  const izin = absensiSaya.filter((a) => a.status === "izin").length
  const alpha = absensiSaya.filter((a) => a.status === "alpha").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Absensi Saya</h1>
        <p className="text-gray-500">Riwayat kehadiran dan denda alpha</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{absensiSaya.length}</p>
              <p className="text-xs text-gray-500">Total Kegiatan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{hadir}</p>
              <p className="text-xs text-gray-500">Hadir</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{izin}</p>
              <p className="text-xs text-gray-500">Izin</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <XCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{alpha}</p>
              <p className="text-xs text-gray-500">Alpha</p>
              <p className="text-[10px] text-red-500">Denda: Rp{totalDenda.toLocaleString("id-ID")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Riwayat Absensi</h3>
        </CardHeader>
        <CardContent>
          {absensiSaya.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada absensi</p>
          ) : (
            <div className="space-y-3">
              {absensiSaya.map((a) => {
                const kegiatan = mockKegiatan.find((k) => k.id === a.kegiatanId)
                return (
                  <div key={a.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{kegiatan?.judul || "—"}</p>
                      <p className="text-xs text-gray-500">{kegiatan ? new Date(kegiatan.tanggal).toLocaleDateString("id-ID") : "—"}</p>
                    </div>
                    <Badge
                      variant={a.status === "hadir" ? "success" : a.status === "izin" ? "warning" : "danger"}
                    >
                      {a.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
