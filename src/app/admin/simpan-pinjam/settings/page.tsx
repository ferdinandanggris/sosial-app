"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { mockSettings } from "@/lib/mock-data"

export default function AdminSimpanPinjamSettingsPage() {
  const [defaultJumlah, setDefaultJumlah] = useState(String(mockSettings.find((s) => s.key === "pinjaman.defaultJumlah")?.value || 100000))
  const [bunga, setBunga] = useState(String(mockSettings.find((s) => s.key === "pinjaman.bunga")?.value || 2500))
  const [denda, setDenda] = useState(String(mockSettings.find((s) => s.key === "pinjaman.denda")?.value || 5000))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const updateSetting = (key: string, value: number) => {
      const s = mockSettings.find((s) => s.key === key)
      if (s) s.value = value
    }
    updateSetting("pinjaman.defaultJumlah", Number(defaultJumlah))
    updateSetting("pinjaman.bunga", Number(bunga))
    updateSetting("pinjaman.denda", Number(denda))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Pengaturan Simpan Pinjam" description="Konfigurasi default pinjaman" />

      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-6">
          <Input label="Default Jumlah 1 Unit Pinjaman (Rp)" type="number" value={defaultJumlah} onChange={(e) => setDefaultJumlah(e.target.value)} min={0} />
          <Input label="Bunga per Unit per Bulan (Rp)" type="number" value={bunga} onChange={(e) => setBunga(e.target.value)} min={0} />
          <Input label="Denda Keterlambatan (Rp)" type="number" value={denda} onChange={(e) => setDenda(e.target.value)} min={0} />
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave}>Simpan Pengaturan</Button>
            {saved && <span className="text-sm text-green-600">Tersimpan!</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
