import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Calendar } from "lucide-react"
import type { Post } from "@/types"

const kategoriBadge: Record<string, "default" | "success" | "warning" | "info"> = {
  artikel: "info", berita: "success", pengumuman: "warning",
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-blue-100" />
        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant={kategoriBadge[post.kategori]}>{post.kategori}</Badge>
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                #{t}
              </span>
            ))}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 line-clamp-2">
            {post.judul}
          </h3>
          <p className="mb-3 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export { PostCard }
