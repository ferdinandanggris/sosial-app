"use client"

import { useMemo } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { HandCoins, TrendingUp, CheckCircle2, Clock, Layers } from "lucide-react"
import { mockPinjamanProgram, mockPinjaman, mockAngsuran, mockUsers, mockSettings } from "@/lib/mock-data"

export default function DashboardSimpanPinjamPage() {
  const user = useAuthStore((s) => s.user)

  const pinjamanSaya = useMemo(
    () => mockPinjaman.filter((p) => p.anggotaId === user?.id),
    [user?.id],
  )

  const programIds = useMemo(() => [...new Set(pinjamanSaya.map((p) => p.programId))], [pinjamanSaya])
  const programsAktif = useMemo(
    () => mockPinjamanProgram.filter((pr) => programIds.includes(pr.id) && pr.status === "aktif"),
    [programIds],
  )
  const programsLunas = useMemo(
    () => mockPinjamanProgram.filter((pr) => programIds.includes(pr.id) && pr.status === "ditutup"),
    [programIds],
  )

  const totalPinjaman = useMemo(() => pinjamanSaya.reduce((a, b) => a + b.jumlahPinjaman, 0), [pinjamanSaya])
  const totalSisa = useMemo(() => pinjamanSaya.reduce((a, b) => a + b.sisaPinjaman, 0), [pinjamanSaya])

  const totalDibayar = useMemo(() => {
    const pinjamanIds = pinjamanSaya.map((p) => p.id)
    return mockAngsuran.filter((a) => pinjamanIds.includes(a.pinjamanId)).reduce((sum, a) => sum + a.jumlah, 0)
  }, [pinjamanSaya])

  const defaultJumlah = mockSettings.find((s) => s.key === "pinjaman.defaultJumlah")?.value || 100000

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Simpan Pinjam</h1>
        <p className="text-gray-500">Program pinjaman yang kamu ikuti</p>
      </div>

      <div className="flex flex-col gap-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{programIds.length}</p>
              <p className="text-xs text-gray-500">Program Diikuti</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalPinjaman.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Total Pinjaman</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalDibayar.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Sudah Dibayar</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalSisa.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Sisa Pokok</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Program Aktif</h3>
        </CardHeader>
        <CardContent>
          {programsAktif.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada program aktif</p>
          ) : (
            <div className="space-y-3">
              {programsAktif.map((pr) => {
                const p = pinjamanSaya.find((pi) => pi.programId === pr.id)
                return (
                  <div key={pr.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pr.nama}</p>
                      <p className="text-xs text-gray-500">
                        {p?.unit} unit = Rp{((p?.unit || 0) * defaultJumlah).toLocaleString("id-ID")} &middot;
                        Sisa pokok: Rp{p?.sisaPinjaman.toLocaleString("id-ID") || "0"} &middot;
                        Tenor: {pr.tenor} bln
                      </p>
                    </div>
                    <Badge variant="success">Aktif</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Program Selesai</h3>
        </CardHeader>
        <CardContent>
          {programsLunas.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada program selesai</p>
          ) : (
            <div className="space-y-3">
              {programsLunas.map((pr) => (
                <div key={pr.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pr.nama}</p>
                    <p className="text-xs text-gray-500">Ditutup: {pr.tanggalTutup ? new Date(pr.tanggalTutup).toLocaleDateString("id-ID") : "—"}</p>
                  </div>
                  <Badge variant="default">Selesai</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
