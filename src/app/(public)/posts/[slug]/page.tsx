import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Calendar, ArrowLeft, Share2, Tag } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"
import { PostCard } from "@/components/posts/PostCard"

const kategoriBadge: Record<string, "default" | "success" | "warning" | "info"> = {
  artikel: "info", berita: "success", pengumuman: "warning",
}

export default async function DetailPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = mockPosts.find((p) => p.slug === slug)
  if (!post || post.status !== "published") notFound()

  const terkait = mockPosts
    .filter((p) => p.id !== post.id && p.status === "published" && p.kategori === post.kategori)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 pb-8 pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/posts"
            className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-primary-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke artikel
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="-mt-6 mb-8 aspect-[21/9] rounded-xl bg-gradient-to-br from-primary-100 to-blue-100" />

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant={kategoriBadge[post.kategori]}>{post.kategori}</Badge>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {new Date(post.createdAt).toLocaleDateString("id-ID", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              <Tag className="h-3 w-3" />
              {t}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{post.judul}</h1>

        <p className="mb-8 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>

        <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: post.konten }} />

        <div className="mt-10 flex items-center gap-4 border-t border-gray-200 pt-6">
          <Button variant="secondary" className="gap-2">
            <Share2 className="h-4 w-4" />
            Bagikan
          </Button>
        </div>
      </article>

      {terkait.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Artikel Terkait</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {terkait.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
