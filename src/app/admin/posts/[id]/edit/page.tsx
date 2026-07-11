"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PageHeader } from "@/components/admin/PageHeader"
import { PostForm } from "@/components/admin/PostForm"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/types"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)

  const post = mockPosts.find((p) => p.id === params.id)
  if (!post) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Post" description="Post tidak ditemukan" />
        <p className="text-sm text-gray-500">Post dengan ID {params.id} tidak ditemukan.</p>
      </div>
    )
  }

  const handleSave = (data: Partial<Post>) => {
    setLoading(true)
    setTimeout(() => {
      const idx = mockPosts.findIndex((p) => p.id === post.id)
      if (idx >= 0) {
        mockPosts[idx] = { ...mockPosts[idx], ...data, updatedAt: new Date().toISOString() } as Post
      }
      router.push("/admin/posts")
    }, 500)
  }

  return (
    <div>
      <PageHeader title="Edit Post" description={`Edit: ${post.judul}`} />
      <div className="mx-auto max-w-3xl">
        <PostForm initial={post} onSave={handleSave} onCancel={() => router.push("/admin/posts")} loading={loading} />
      </div>
    </div>
  )
}
