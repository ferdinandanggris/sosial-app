"use client"

import { useState } from "react"
import { PageBanner } from "@/components/landing/PageBanner"
import { GaleriGrid } from "@/components/galeri/GaleriGrid"
import { LightboxModal } from "@/components/galeri/LightboxModal"
import { mockGaleri } from "@/lib/mock-data"
import type { GaleriItem } from "@/types"

export default function GaleriPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleItemClick = (item: GaleriItem) => {
    const index = mockGaleri.findIndex((g) => g.id === item.id)
    setSelectedIndex(index)
  }

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? mockGaleri.length - 1 : prev - 1) : null,
    )
  }

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === mockGaleri.length - 1 ? 0 : prev + 1) : null,
    )
  }

  return (
    <>
      <PageBanner title="Galeri" description="Dokumentasi kegiatan dan momen-momen seru Karang Taruna Sukamaju" />
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GaleriGrid
            items={mockGaleri}
            onItemClick={handleItemClick}
          />
        </div>
      </section>

      {selectedIndex !== null && (
        <LightboxModal
          items={mockGaleri}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  )
}
