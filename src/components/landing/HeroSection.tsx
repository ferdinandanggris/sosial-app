import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
            Karang Taruna Sukamaju — Sejak 2015
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Bersama Membangun{" "}
            <span className="text-primary-600">Pemuda Kreatif</span>
            {" "}dan Produktif
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Wadah pengembangan potensi pemuda Sukamaju. Belajar, berkarya, dan
            berkontribusi untuk lingkungan yang lebih baik.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Gabung Sekarang
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/posts">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Lihat Artikel
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/2 h-32 w-[120%] -translate-x-1/2 rounded-[50%] bg-white" />
    </section>
  )
}

export { HeroSection }
