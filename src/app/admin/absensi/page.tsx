"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/admin/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ClipboardCheck, Calendar, UserCheck, UserMinus, UserX } from "lucide-react"
import { mockKegiatan, mockAbsensi } from "@/lib/mock-data"

export default function AdminAbsensiPage() {
  const [filterBulan, setFilterBulan] = useState("")

  const kegiatanDipublish = useMemo(() => mockKegiatan.filter((k) => k.status === "published"), [])

  const filtered = useMemo(() => {
    if (!filterBulan) return kegiatanDipublish
    return kegiatanDipublish.filter((k) => k.tanggal.startsWith(filterBulan))
  }, [kegiatanDipublish, filterBulan])

  const rekapByKegiatan = useMemo(() => {
    const rekap: Record<string, { hadir: number; izin: number; alpha: number }> = {}
    for (const k of kegiatanDipublish) {
      const absenList = mockAbsensi.filter((a) => a.kegiatanId === k.id)
      rekap[k.id] = {
        hadir: absenList.filter((a) => a.status === "hadir").length,
        izin: absenList.filter((a) => a.status === "izin").length,
        alpha: absenList.filter((a) => a.status === "alpha").length,
      }
    }
    return rekap
  }, [kegiatanDipublish])

  return (
    <div>
      <PageHeader title="Absensi" description="Kelola absensi kegiatan" />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-48">
          <input
            type="month"
            value={filterBulan}
            onChange={(e) => setFilterBulan(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <Link href="/admin/absensi/laporan">
          <Button variant="secondary">Laporan Bulanan</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((k) => {
          const r = rekapByKegiatan[k.id]
          return (
            <div key={k.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{k.judul}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(k.tanggal).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <Link href={`/admin/absensi/${k.id}`}>
                  <Button className="gap-1 shrink-0 min-w-[120px] justify-center">
                    <ClipboardCheck className="h-4 w-4" />
                    Isi Absen
                  </Button>
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-900">{r?.hadir || 0}</span>
                  <span className="text-gray-400">Hadir</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <UserMinus className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-gray-900">{r?.izin || 0}</span>
                  <span className="text-gray-400">Izin</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-gray-900">{r?.alpha || 0}</span>
                  <span className="text-gray-400">Alpha</span>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">Tidak ada kegiatan ditemukan</p>
        )}
      </div>
    </div>
  )
}
