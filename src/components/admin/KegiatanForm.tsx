"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import type { Kegiatan } from "@/types"

const kategoriOptions = [
  { value: "acara", label: "Acara" },
  { value: "pelatihan", label: "Pelatihan" },
  { value: "sosial", label: "Sosial" },
  { value: "lainnya", label: "Lainnya" },
]

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
]

interface KegiatanFormProps {
  initial?: Kegiatan
  onSave: (data: Partial<Kegiatan>) => void
  onCancel: () => void
  loading?: boolean
}

function KegiatanForm({ initial, onSave, onCancel, loading }: KegiatanFormProps) {
  const [judul, setJudul] = useState(initial?.judul || "")
  const [deskripsi, setDeskripsi] = useState(initial?.deskripsi || "")
  const [konten, setKonten] = useState(initial?.konten || "")
  const [kategori, setKategori] = useState(initial?.kategori || "")
  const [tanggal, setTanggal] = useState(initial?.tanggal || "")
  const [lokasi, setLokasi] = useState(initial?.lokasi || "")
  const [foto, setFoto] = useState(initial?.foto?.join(", ") || "")
  const [status, setStatus] = useState(initial?.status || "draft")
  const [dendaAlpha, setDendaAlpha] = useState(String(initial?.dendaAlpha || 0))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      judul, deskripsi, konten,
      kategori: kategori as Kegiatan["kategori"],
      tanggal, lokasi,
      foto: foto.split(",").map((f) => f.trim()).filter(Boolean),
      status: status as Kegiatan["status"],
      dendaAlpha: Number(dendaAlpha),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
      <Textarea label="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
      <Textarea label="Konten" value={konten} onChange={(e) => setKonten(e.target.value)} rows={6} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Kategori" options={kategoriOptions} value={kategori} onValueChange={(v) => setKategori(v)} />
        <Input label="Tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
      </div>
      <Input label="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
      <Input label="Foto (URL, pisahkan dengan koma)" value={foto} onChange={(e) => setFoto(e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" options={statusOptions} value={status} onValueChange={(v) => setStatus(v as "draft" | "published")} />
        <Input label="Denda Alpha (Rp)" type="number" value={dendaAlpha} onChange={(e) => setDendaAlpha(e.target.value)} min={0} />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
        <Button type="submit" loading={loading}>{initial ? "Simpan" : "Tambah"}</Button>
      </div>
    </form>
  )
}

export { KegiatanForm }
