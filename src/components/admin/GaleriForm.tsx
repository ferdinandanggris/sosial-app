"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import type { GaleriItem } from "@/types"

const kategoriOptions = [
  { value: "kegiatan", label: "Kegiatan" },
  { value: "pelatihan", label: "Pelatihan" },
  { value: "rapat", label: "Rapat" },
  { value: "lainnya", label: "Lainnya" },
]

interface GaleriFormProps {
  initial?: GaleriItem
  onSave: (data: Partial<GaleriItem>) => void
  onCancel: () => void
  loading?: boolean
}

function GaleriForm({ initial, onSave, onCancel, loading }: GaleriFormProps) {
  const [url, setUrl] = useState(initial?.url || "")
  const [caption, setCaption] = useState(initial?.caption || "")
  const [kategori, setKategori] = useState(initial?.kategori || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ url, caption, kategori })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8">
        <div className="text-center">
          <div className="mx-auto mb-2 h-16 w-16 rounded-lg bg-gradient-to-br from-primary-100 to-blue-100" />
          <p className="text-sm text-gray-500">Preview gambar akan muncul di sini</p>
        </div>
      </div>
      <Input
        label="URL Gambar"
        placeholder="https://example.com/image.jpg"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Input
        label="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />
      <Select
        label="Kategori"
        options={kategoriOptions}
        value={kategori}
        onValueChange={(v) => setKategori(v)}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? "Simpan" : "Tambah"}
        </Button>
      </div>
    </form>
  )
}

export { GaleriForm }
