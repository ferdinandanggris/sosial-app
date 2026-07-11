"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Wallet, ClipboardCheck, Clock, ArrowUpRight, AlertTriangle } from "lucide-react"
import { mockUsers, mockAbsensi, mockKegiatan, mockTagihan, mockKasTransaksi } from "@/lib/mock-data"

type Tab = "absensi" | "tagihan"

export default function DetailAnggotaPage() {
  const params = useParams()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("absensi")

  const anggota = useMemo(() => mockUsers.find((u) => u.id === params.id), [params.id])

  if (!anggota) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-500">Anggota tidak ditemukan</p>
        <Button variant="secondary" onClick={() => router.back()}>Kembali</Button>
      </div>
    )
  }

  const absensiSaya = mockAbsensi.filter((a) => a.anggotaId === anggota.id)
  const tagihanSaya = mockTagihan.filter((t) => t.anggotaId === anggota.id)
  const tagihanLunas = tagihanSaya.filter((t) => t.status === "lunas")
  const totalDendaLunas = tagihanLunas.reduce((a, b) => a + b.jumlah, 0)

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </button>

      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <Avatar src={anggota.foto} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-gray-900">{anggota.nama}</p>
            <p className="text-sm text-gray-500">{anggota.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              {anggota.roles.map((r) => (
                <Badge key={r} variant={r === "admin" ? "danger" : r === "bendahara" ? "success" : r === "sekretaris" ? "info" : "default"} className="capitalize">{r}</Badge>
              ))}
              <Badge variant={anggota.status === "aktif" ? "success" : "danger"}>{anggota.status}</Badge>
            </div>
          </div>
        </CardContent>
        {anggota.noHp || anggota.alamat ? (
          <div className="border-t border-gray-100 px-5 py-3 space-y-1 text-sm text-gray-500">
            {anggota.noHp && <p>No. HP: {anggota.noHp}</p>}
            {anggota.alamat && <p>Alamat: {anggota.alamat}</p>}
            <p>Bergabung: {new Date(anggota.tanggalBergabung).toLocaleDateString("id-ID")}</p>
          </div>
        ) : null}
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <ClipboardCheck className="h-4 w-4" />
            </div>
            <p className="text-lg font-bold text-gray-900">{absensiSaya.length}</p>
            <p className="text-[10px] text-gray-500 text-center">Kegiatan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <p className="text-lg font-bold text-gray-900">{tagihanSaya.filter((t) => t.status === "belum_dibayar").length}</p>
            <p className="text-[10px] text-gray-500 text-center">Tagihan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Wallet className="h-4 w-4" />
            </div>
            <p className="text-lg font-bold text-gray-900">Rp{totalDendaLunas.toLocaleString("id-ID")}</p>
            <p className="text-[10px] text-gray-500 text-center">Denda Lunas</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button onClick={() => setTab("absensi")} className={`pb-2 px-3 text-sm font-medium transition-colors ${tab === "absensi" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}>
          Riwayat Absensi
        </button>
        <button onClick={() => setTab("tagihan")} className={`pb-2 px-3 text-sm font-medium transition-colors ${tab === "tagihan" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}>
          Riwayat Tagihan
        </button>
      </div>

      {tab === "absensi" ? (
        <div className="space-y-2">
          {absensiSaya.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">Belum ada riwayat absensi</p>
          ) : (
            absensiSaya.map((a) => {
              const k = mockKegiatan.find((k) => k.id === a.kegiatanId)
              return (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.status === "hadir" ? "bg-green-100 text-green-600" : a.status === "izin" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
                      <ClipboardCheck className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{k?.judul || "—"}</p>
                      <p className="text-xs text-gray-500">{k ? new Date(k.tanggal).toLocaleDateString("id-ID") : "—"}</p>
                    </div>
                  </div>
                  <Badge variant={a.status === "hadir" ? "success" : a.status === "izin" ? "warning" : "danger"} className="capitalize shrink-0 ml-2">
                    {a.status}
                  </Badge>
                </div>
              )
            })
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {tagihanSaya.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">Belum ada tagihan</p>
          ) : (
            tagihanSaya.map((t) => {
              const k = t.kegiatanId ? mockKegiatan.find((k) => k.id === t.kegiatanId) : null
              return (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.status === "lunas" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                      {t.status === "lunas" ? <ArrowUpRight className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 capitalize">{t.jenis.replace("_", " ")}</p>
                      <p className="text-xs text-gray-500">
                        Rp{t.jumlah.toLocaleString("id-ID")}
                        {k && ` · ${k.judul}`}
                        {t.status === "lunas" && t.lunasAt && ` · ${new Date(t.lunasAt).toLocaleDateString("id-ID")}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant={t.status === "lunas" ? "success" : "warning"} className="shrink-0 ml-2">
                    {t.status === "lunas" ? "Lunas" : "Belum"}
                  </Badge>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
