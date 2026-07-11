"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/PageHeader"
import { AbsensiForm } from "@/components/admin/AbsensiForm"
import { mockKegiatan, mockTagihan } from "@/lib/mock-data"

export default function AdminAbsensiIsiPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const kegiatan = mockKegiatan.find((k) => k.id === params.kegiatanId)
  if (!kegiatan) return <p className="p-6 text-gray-500">Kegiatan tidak ditemukan</p>

  const handleSave = (data: { anggotaId: string; status: "hadir" | "izin" | "alpha"; keterangan?: string }[]) => {
    setLoading(true)
    setTimeout(() => {
      const alphaEntries = data.filter((d) => d.status === "alpha")
      mockTagihan.push(
        ...alphaEntries.map((a) => ({
          id: `t-auto-${Date.now()}-${a.anggotaId}`,
          anggotaId: a.anggotaId,
          kegiatanId: kegiatan.id,
          jenis: "denda_alpha" as const,
          jumlah: kegiatan.dendaAlpha,
          status: "belum_dibayar" as const,
          createdAt: new Date().toISOString().split("T")[0],
        })),
      )
      setLoading(false)
      router.push("/admin/absensi")
    }, 500)
  }

  return (
    <div>
      <PageHeader title="Isi Absensi" description={`${kegiatan.judul} — ${new Date(kegiatan.tanggal).toLocaleDateString("id-ID")}`} />

      <div className="max-w-2xl">
        <AbsensiForm kegiatan={kegiatan} onSave={handleSave} onCancel={() => router.push("/admin/absensi")} loading={loading} />
      </div>
    </div>
  )
}
