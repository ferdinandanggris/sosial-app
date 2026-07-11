import { Badge } from "@/components/ui/Badge"
import { Calendar, MapPin } from "lucide-react"
import type { Kegiatan } from "@/types"

const statusBadge: Record<string, "success" | "default" | "warning" | "info"> = {
  "Hari Ini": "info",
  "akan datang": "warning",
  selesai: "success",
  hadir: "success",
}

function KegiatanSayaCard({ kegiatan, status }: { kegiatan: Kegiatan; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <Badge variant="default">{kegiatan.kategori}</Badge>
          <Badge variant={statusBadge[status] || "default"}>{status}</Badge>
        </div>
        <h3 className="font-medium text-gray-900 truncate">{kegiatan.judul}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(kegiatan.tanggal).toLocaleDateString("id-ID")}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {kegiatan.lokasi}
          </span>
        </div>
      </div>
    </div>
  )
}

export { KegiatanSayaCard }
