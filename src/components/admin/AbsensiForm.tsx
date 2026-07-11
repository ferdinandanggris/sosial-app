"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { mockUsers } from "@/lib/mock-data"
import type { Kegiatan } from "@/types"

const statusList = [
  { value: "hadir", label: "Hadir", color: "text-green-600 border-green-300" },
  { value: "izin", label: "Izin", color: "text-yellow-600 border-yellow-300" },
  { value: "alpha", label: "Alpha", color: "text-red-600 border-red-300" },
]

interface AbsensiFormProps {
  kegiatan: Kegiatan
  onSave: (data: { anggotaId: string; status: "hadir" | "izin" | "alpha"; keterangan?: string }[]) => void
  onCancel: () => void
  loading?: boolean
}

function AbsensiForm({ kegiatan, onSave, onCancel, loading }: AbsensiFormProps) {
  const anggotaAktif = mockUsers.filter((u) => u.status === "aktif")
  const [entries, setEntries] = useState<Record<string, { status: "hadir" | "izin" | "alpha"; keterangan: string }>>(
    Object.fromEntries(anggotaAktif.map((u) => [u.id, { status: "hadir" as const, keterangan: "" }])),
  )

  const setStatus = (anggotaId: string, status: "hadir" | "izin" | "alpha") => {
    setEntries((prev) => ({ ...prev, [anggotaId]: { ...prev[anggotaId], status } }))
  }

  const setKeterangan = (anggotaId: string, keterangan: string) => {
    setEntries((prev) => ({ ...prev, [anggotaId]: { ...prev[anggotaId], keterangan } }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(
      Object.entries(entries).map(([anggotaId, data]) => ({
        anggotaId,
        status: data.status,
        keterangan: data.keterangan || undefined,
      })),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2 text-sm text-gray-500">
        Absensi: <strong>{kegiatan.judul}</strong> &middot; {new Date(kegiatan.tanggal).toLocaleDateString("id-ID")}
      </div>
      <p className="text-xs text-gray-400">Denda Alpha: Rp{kegiatan.dendaAlpha.toLocaleString("id-ID")}</p>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {anggotaAktif.map((anggota) => (
          <div key={anggota.id} className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{anggota.nama}</span>
              <div className="flex gap-2">
                {statusList.map((s) => (
                  <label
                    key={s.value}
                    className={`cursor-pointer rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
                      entries[anggota.id]?.status === s.value
                        ? `bg-${s.value === "hadir" ? "green" : s.value === "izin" ? "yellow" : "red"}-50 ${s.color}`
                        : "border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`status-${anggota.id}`}
                      value={s.value}
                      checked={entries[anggota.id]?.status === s.value}
                      onChange={() => setStatus(anggota.id, s.value as "hadir" | "izin" | "alpha")}
                      className="sr-only"
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            </div>
            {entries[anggota.id]?.status === "izin" && (
              <input
                type="text"
                placeholder="Keterangan izin..."
                value={entries[anggota.id]?.keterangan || ""}
                onChange={(e) => setKeterangan(anggota.id, e.target.value)}
                className="mt-2 h-8 w-full rounded border border-gray-200 px-2 text-xs focus:border-primary-500 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
        <Button type="submit" loading={loading}>Simpan Absensi</Button>
      </div>
    </form>
  )
}

export { AbsensiForm }
