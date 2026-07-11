import { ImageIcon } from "lucide-react"
import type { GaleriItem } from "@/types"

function GaleriCard({ item, onClick }: { item: GaleriItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-blue-100 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <div className="flex h-full items-center justify-center text-gray-400">
        <ImageIcon className="h-12 w-12" />
      </div>
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-sm font-medium text-white line-clamp-2">{item.caption}</p>
        <p className="mt-0.5 text-xs text-white/70">{item.kategori}</p>
      </div>
    </button>
  )
}

export { GaleriCard }
