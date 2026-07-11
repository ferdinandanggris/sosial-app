"use client"

import { GaleriCard } from "./GaleriCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import type { GaleriItem } from "@/types"

interface GaleriGridProps {
  items: GaleriItem[]
  loading?: boolean
  error?: boolean
  onRetry?: () => void
  onItemClick: (item: GaleriItem) => void
}

function GaleriGrid({ items, loading, error, onRetry, onItemClick }: GaleriGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />
  }

  if (!items.length) {
    return (
      <EmptyState
        message="Belum ada foto"
        description="Galeri masih kosong, nantikan update terbaru ya"
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <GaleriCard key={item.id} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
  )
}

export { GaleriGrid }
