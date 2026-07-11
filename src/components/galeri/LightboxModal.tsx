"use client"

import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GaleriItem } from "@/types"

interface LightboxModalProps {
  items: GaleriItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function LightboxModal({ items, currentIndex, onClose, onPrev, onNext }: LightboxModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": onClose(); break
        case "ArrowLeft": onPrev(); break
        case "ArrowRight": onNext(); break
      }
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  const current = items[currentIndex]
  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${currentIndex + 1} dari ${items.length}`}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Tutup"
      >
        <X className="h-6 w-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Berikutnya"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div
        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex aspect-square w-80 items-center justify-center rounded-lg bg-gradient-to-br from-primary-200 to-blue-200 sm:w-96 lg:w-[500px]">
          <span className="text-4xl text-gray-400">📷</span>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-white">{current.caption}</p>
          <p className="mt-1 text-sm text-white/60">
            {currentIndex + 1} / {items.length} &middot; {current.kategori}
          </p>
        </div>
      </div>
    </div>
  )
}

export { LightboxModal }
