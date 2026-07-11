"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Editor } from "@/components/admin/Editor"
import type { Post } from "@/types"

const kategoriOptions = [
  { value: "artikel", label: "Artikel" },
  { value: "berita", label: "Berita" },
  { value: "pengumuman", label: "Pengumuman" },
]

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
]

interface PostFormProps {
  initial?: Post
  onSave: (data: Partial<Post>) => void
  onCancel: () => void
  loading?: boolean
}

function PostForm({ initial, onSave, onCancel, loading }: PostFormProps) {
  const [judul, setJudul] = useState(initial?.judul || "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "")
  const [konten, setKonten] = useState(initial?.konten || "")
  const [kategori, setKategori] = useState(initial?.kategori || "")
  const [coverImage, setCoverImage] = useState(initial?.coverImage || "")
  const [tagsInput, setTagsInput] = useState(initial?.tags?.join(", ") || "")
  const [status, setStatus] = useState(initial?.status || "draft")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      judul,
      excerpt,
      konten,
      kategori: kategori as Post["kategori"],
      coverImage,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      status: status as Post["status"],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
      <Textarea label="Excerpt (ringkasan)" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Konten</label>
        <Editor value={konten} onChange={setKonten} placeholder="Tulis konten artikel di sini..." />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Kategori" options={kategoriOptions} value={kategori} onValueChange={(v) => setKategori(v)} />
        <Select label="Status" options={statusOptions} value={status} onValueChange={(v) => setStatus(v as "draft" | "published")} />
      </div>
      <Input label="URL Cover Image" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
      <Input label="Tags (pisahkan dengan koma)" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="contoh: pemuda, lingkungan, kegiatan" />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
        <Button type="submit" loading={loading}>{initial ? "Simpan" : "Tambah"}</Button>
      </div>
    </form>
  )
}

export { PostForm }
