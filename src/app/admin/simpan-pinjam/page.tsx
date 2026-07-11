"use client"

import { useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { HandCoins, TrendingUp, Users, Layers, Wallet } from "lucide-react"
import { mockPinjamanProgram, mockPinjaman, mockAngsuran, mockSettings } from "@/lib/mock-data"

export default function AdminSimpanPinjamPage() {
  const programAktif = useMemo(() => mockPinjamanProgram.filter((p) => p.status === "aktif"), [])
  const programDitutup = useMemo(() => mockPinjamanProgram.filter((p) => p.status === "ditutup"), [])
  const totalProgram = mockPinjamanProgram.length

  const totalUnit = useMemo(
    () => mockPinjaman.reduce((a, b) => a + b.unit, 0),
    [],
  )

  const totalPinjaman = useMemo(
    () => mockPinjaman.reduce((a, b) => a + b.jumlahPinjaman, 0),
    [],
  )

  const totalSisa = useMemo(
    () => mockPinjaman.filter((p) => mockPinjamanProgram.find((pr) => pr.id === p.programId)?.status === "aktif").reduce((a, b) => a + b.sisaPinjaman, 0),
    [],
  )

  const defaultJumlah = useMemo(() => mockSettings.find((s) => s.key === "pinjaman.defaultJumlah")?.value || 100000, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Simpan Pinjam" description="Manajemen program pinjaman anggota" />

      <div className="flex flex-col gap-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{totalProgram}</p>
              <p className="text-xs text-gray-500">Total Program</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <HandCoins className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{programAktif.length}</p>
              <p className="text-xs text-gray-500">Program Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{totalUnit}</p>
              <p className="text-xs text-gray-500">Total Unit Pinjaman</p>
              <p className="text-[10px] text-gray-400">1 unit = Rp{defaultJumlah.toLocaleString("id-ID")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
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
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{totalSisa.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Sisa Pinjaman</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/simpan-pinjam/pinjaman" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          Daftar Program Pinjaman
        </Link>
        <Link href="/admin/simpan-pinjam/settings" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Pengaturan
        </Link>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Program Aktif</h2>
        {programAktif.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada program aktif</p>
        ) : (
          <div className="space-y-2">
            {programAktif.map((pr) => {
              const pinjamanList = mockPinjaman.filter((p) => p.programId === pr.id)
              const totalUnitPr = pinjamanList.reduce((a, b) => a + b.unit, 0)
              return (
                <Link key={pr.id} href={`/admin/simpan-pinjam/pinjaman/${pr.id}`} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pr.nama}</p>
                    <p className="text-xs text-gray-500">{totalUnitPr} unit &middot; {pinjamanList.length} anggota &middot; Tenor {pr.tenor} bln</p>
                  </div>
                  <Badge variant="success">Aktif</Badge>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
