"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import type { KasTransaksi } from "@/types"

const jenisOptions = [
  { value: "pemasukan", label: "Pemasukan" },
  { value: "pengeluaran", label: "Pengeluaran" },
]

const kategoriPemasukan = [
  { value: "iuran", label: "Iuran" },
  { value: "donasi", label: "Donasi" },
  { value: "denda", label: "Denda" },
  { value: "lainnya", label: "Lainnya" },
]

const kategoriPengeluaran = [
  { value: "operasional", label: "Operasional" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "lainnya", label: "Lainnya" },
]

interface KasFormProps {
  initial?: KasTransaksi
  onSave: (data: Partial<KasTransaksi>) => void
  onCancel: () => void
  loading?: boolean
}

function KasForm({ initial, onSave, onCancel, loading }: KasFormProps) {
  const [jenis, setJenis] = useState(initial?.jenis || "pemasukan")
  const [kategori, setKategori] = useState(initial?.kategori || "iuran")
  const [jumlah, setJumlah] = useState(String(initial?.jumlah || ""))
  const [deskripsi, setDeskripsi] = useState(initial?.deskripsi || "")

  const kategoriOptions = jenis === "pemasukan" ? kategoriPemasukan : kategoriPengeluaran

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      jenis: jenis as KasTransaksi["jenis"],
      kategori,
      jumlah: Number(jumlah),
      deskripsi,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select label="Jenis" options={jenisOptions} value={jenis} onValueChange={(v) => { setJenis(v as "pemasukan" | "pengeluaran"); setKategori("") }} />
      <Select label="Kategori" options={kategoriOptions} value={kategori} onValueChange={(v) => setKategori(v)} />
      <Input label="Jumlah (Rp)" type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required min={0} />
      <Input label="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
        <Button type="submit" loading={loading}>{initial ? "Simpan" : "Tambah"}</Button>
      </div>
    </form>
  )
}

export { KasForm }
