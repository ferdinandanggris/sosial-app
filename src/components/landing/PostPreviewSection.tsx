import { PostCard } from "@/components/posts/PostCard"
import { SectionHeader } from "./SectionHeader"
import { mockPosts } from "@/lib/mock-data"

function PostPreviewSection() {
  const published = mockPosts.filter((p) => p.status === "published").slice(0, 3)

  if (!published.length) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Postingan Terbaru"
            description="Belum ada postingan yang dipublikasikan"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Postingan Terbaru"
          description="Ikuti berbagai informasi dan artikel terbaru dari Karang Taruna Sukamaju"
          action={{ label: "Lihat Semua", href: "/posts" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { PostPreviewSection }
