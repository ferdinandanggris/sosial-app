"use client"

import { useMemo } from "react"
import { PageHeader } from "@/components/admin/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import TabTransaksi from "@/components/admin/kas/TabTransaksi"
import TabTagihan from "@/components/admin/kas/TabTagihan"
import TabLaporan from "@/components/admin/kas/TabLaporan"
import { Wallet, AlertTriangle } from "lucide-react"
import { mockKasTransaksi, mockTagihan } from "@/lib/mock-data"

export default function AdminKasPage() {
  const saldo = useMemo(() => {
    const pemasukan = mockKasTransaksi.filter((t) => t.jenis === "pemasukan").reduce((a, b) => a + b.jumlah, 0)
    const pengeluaran = mockKasTransaksi.filter((t) => t.jenis === "pengeluaran").reduce((a, b) => a + b.jumlah, 0)
    return pemasukan - pengeluaran
  }, [])

  const tagihanOutstanding = mockTagihan.filter((t) => t.status === "belum_dibayar")

  return (
    <div className="space-y-6">
      <PageHeader title="Kas Arisan" description="Manajemen keuangan Karang Taruna" />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Card className="flex-1">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Rp{saldo.toLocaleString("id-ID")}</p>
              <p className="text-xs text-gray-500">Total Saldo</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{tagihanOutstanding.length}</p>
              <p className="text-xs text-gray-500">Tagihan Outstanding</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transaksi">
        <TabsList>
          <TabsTrigger value="transaksi">Transaksi</TabsTrigger>
          <TabsTrigger value="tagihan">Tagihan</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="transaksi">
          <TabTransaksi />
        </TabsContent>

        <TabsContent value="tagihan">
          <TabTagihan />
        </TabsContent>

        <TabsContent value="laporan">
          <TabLaporan />
        </TabsContent>
      </Tabs>
    </div>
  )
}
