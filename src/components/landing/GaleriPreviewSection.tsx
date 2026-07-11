import Link from "next/link"
import { ImageIcon } from "lucide-react"
import { SectionHeader } from "./SectionHeader"
import { mockGaleri } from "@/lib/mock-data"

function GaleriPreviewSection() {
  const items = mockGaleri.slice(0, 4)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Galeri Kegiatan"
          description="Dokumentasi kegiatan kami"
          action={{ label: "Lihat Semua", href: "/galeri" }}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/galeri"
              className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-blue-100"
            >
              <div className="flex h-full items-center justify-center text-gray-400">
                <ImageIcon className="h-10 w-10" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{item.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export { GaleriPreviewSection }
