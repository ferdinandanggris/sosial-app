"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Plus, X } from "lucide-react"
import { mockKontenLanding } from "@/lib/mock-data"

type KontenLandingData = typeof mockKontenLanding

export default function AdminKontenPage() {
  const [data, setData] = useState<KontenLandingData>(JSON.parse(JSON.stringify(mockKontenLanding)))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    Object.assign(mockKontenLanding, data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addMisi = () => {
    setData((prev) => ({ ...prev, visiMisi: { ...prev.visiMisi, misi: [...prev.visiMisi.misi, ""] } }))
  }

  const updateMisi = (index: number, value: string) => {
    setData((prev) => {
      const misi = [...prev.visiMisi.misi]
      misi[index] = value
      return { ...prev, visiMisi: { ...prev.visiMisi, misi } }
    })
  }

  const removeMisi = (index: number) => {
    setData((prev) => ({
      ...prev,
      visiMisi: { ...prev.visiMisi, misi: prev.visiMisi.misi.filter((_, i) => i !== index) },
    }))
  }

  return (
    <div>
      <PageHeader
        title="Konten Landing Page"
        description="Edit konten yang tampil di halaman utama"
        action={
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-green-600">Tersimpan</span>}
            <Button onClick={handleSave}>Simpan Semua</Button>
          </div>
        }
      />

      <Tabs defaultValue="hero">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="visi-misi">Visi & Misi</TabsTrigger>
          <TabsTrigger value="statistik">Statistik</TabsTrigger>
          <TabsTrigger value="kontak">Kontak</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader><h2 className="text-lg font-semibold">Hero Section</h2></CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Judul"
                value={data.hero.judul}
                onChange={(e) => setData((prev) => ({ ...prev, hero: { ...prev.hero, judul: e.target.value } }))}
              />
              <Input
                label="Subjudul"
                value={data.hero.subjudul}
                onChange={(e) => setData((prev) => ({ ...prev, hero: { ...prev.hero, subjudul: e.target.value } }))}
              />
              <Input
                label="URL Gambar"
                value={data.hero.gambar}
                onChange={(e) => setData((prev) => ({ ...prev, hero: { ...prev.hero, gambar: e.target.value } }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visi-misi">
          <Card>
            <CardHeader><h2 className="text-lg font-semibold">Visi & Misi</h2></CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                label="Visi"
                value={data.visiMisi.visi}
                onChange={(e) => setData((prev) => ({ ...prev, visiMisi: { ...prev.visiMisi, visi: e.target.value } }))}
                rows={3}
              />
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Misi</label>
                  <button
                    onClick={addMisi}
                    className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-500"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {data.visiMisi.misi.map((m, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <Textarea
                          value={m}
                          onChange={(e) => updateMisi(i, e.target.value)}
                          rows={2}
                        />
                      </div>
                      <button
                        onClick={() => removeMisi(i)}
                        className="mt-2 rounded p-1 text-gray-400 hover:text-red-600"
                        aria-label="Hapus misi"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistik">
          <Card>
            <CardHeader><h2 className="text-lg font-semibold">Statistik</h2></CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Total Anggota"
                type="number"
                value={String(data.statistik.totalAnggota)}
                onChange={(e) => setData((prev) => ({ ...prev, statistik: { ...prev.statistik, totalAnggota: Number(e.target.value) } }))}
              />
              <Input
                label="Total Kegiatan"
                type="number"
                value={String(data.statistik.totalKegiatan)}
                onChange={(e) => setData((prev) => ({ ...prev, statistik: { ...prev.statistik, totalKegiatan: Number(e.target.value) } }))}
              />
              <Input
                label="Total Program"
                type="number"
                value={String(data.statistik.totalProgram)}
                onChange={(e) => setData((prev) => ({ ...prev, statistik: { ...prev.statistik, totalProgram: Number(e.target.value) } }))}
              />
              <Input
                label="Tahun Berdiri"
                type="number"
                value={String(data.statistik.tahunBerdiri)}
                onChange={(e) => setData((prev) => ({ ...prev, statistik: { ...prev.statistik, tahunBerdiri: Number(e.target.value) } }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kontak">
          <Card>
            <CardHeader><h2 className="text-lg font-semibold">Kontak</h2></CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Alamat"
                value={data.kontak.alamat}
                onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, alamat: e.target.value } }))}
              />
              <Input
                label="No. Telepon"
                value={data.kontak.noTelp}
                onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, noTelp: e.target.value } }))}
              />
              <Input
                label="Email"
                type="email"
                value={data.kontak.email}
                onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, email: e.target.value } }))}
              />
              <Input
                label="URL Maps"
                value={data.kontak.mapsUrl}
                onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, mapsUrl: e.target.value } }))}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input
                  label="Instagram"
                  value={data.kontak.sosialMedia.instagram || ""}
                  onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, sosialMedia: { ...prev.kontak.sosialMedia, instagram: e.target.value } } }))}
                />
                <Input
                  label="YouTube"
                  value={data.kontak.sosialMedia.youtube || ""}
                  onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, sosialMedia: { ...prev.kontak.sosialMedia, youtube: e.target.value } } }))}
                />
                <Input
                  label="TikTok"
                  value={data.kontak.sosialMedia.tiktok || ""}
                  onChange={(e) => setData((prev) => ({ ...prev, kontak: { ...prev.kontak, sosialMedia: { ...prev.kontak.sosialMedia, tiktok: e.target.value } } }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
