"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/PageHeader"
import { PostForm } from "@/components/admin/PostForm"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/types"

export default function CreatePostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSave = (data: Partial<Post>) => {
    setLoading(true)
    setTimeout(() => {
      const newItem: Post = {
        id: String(Date.now()),
        judul: data.judul || "",
        slug: (data.judul || "").toLowerCase().replace(/\s+/g, "-"),
        konten: data.konten || "",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "",
        kategori: (data.kategori as Post["kategori"]) || "artikel",
        tags: data.tags || [],
        status: (data.status as Post["status"]) || "draft",
        penulisId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockPosts.unshift(newItem)
      router.push("/admin/posts")
    }, 500)
  }

  return (
    <div>
      <PageHeader title="Tambah Post" description="Buat artikel, berita, atau pengumuman baru" />
      <div className="mx-auto max-w-3xl">
        <PostForm onSave={handleSave} onCancel={() => router.push("/admin/posts")} loading={loading} />
      </div>
    </div>
  )
}
