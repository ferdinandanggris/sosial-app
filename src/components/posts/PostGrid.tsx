"use client"

import { PostCard } from "./PostCard"
import { SkeletonCard } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import type { Post } from "@/types"

interface PostGridProps {
  items: Post[]
  loading?: boolean
  error?: boolean
  onRetry?: () => void
}

function PostGrid({ items, loading, error, onRetry }: PostGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
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
        message="Postingan tidak ditemukan"
        description="Belum ada postingan yang sesuai dengan filter yang kamu pilih"
      />
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export { PostGrid }
