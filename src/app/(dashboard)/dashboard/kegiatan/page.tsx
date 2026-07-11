"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { KegiatanSayaCard } from "@/components/dashboard/KegiatanSayaCard"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockKegiatan } from "@/lib/mock-data"
import { Calendar } from "lucide-react"

const tabs = [
  { value: "semua", label: "Semua" },
  { value: "akan-datang", label: "Akan Datang" },
  { value: "selesai", label: "Selesai" },
]

export default function KegiatanSayaPage() {
  const [tab, setTab] = useState("semua")

  const semua = mockKegiatan.filter((k) => k.status === "published")

  const filtered = tab === "semua" ? semua : tab === "akan-datang" ? semua.slice(0, 2) : semua.slice(2)

  const getStatus = (k: typeof semua[0]) => {
    const today = new Date().toISOString().split("T")[0]
    if (k.tanggal === today) return "Hari Ini"
    return new Date(k.tanggal) > new Date() ? "akan datang" : "selesai"
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Kegiatan Saya</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            {filtered.length === 0 ? (
              <EmptyState
                icon={<Calendar className="h-12 w-12" />}
                message="Belum ada kegiatan"
                description="Kamu belum terdaftar di kegiatan apapun"
              />
            ) : (
              <div className="space-y-3">
                {filtered.map((k) => (
                  <KegiatanSayaCard key={k.id} kegiatan={k} status={getStatus(k)} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
