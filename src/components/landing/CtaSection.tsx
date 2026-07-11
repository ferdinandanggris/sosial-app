import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white">Siap Bergabung?</h2>
        <p className="mb-8 text-lg text-primary-100">
          Jadilah bagian dari pemuda Sukamaju yang aktif, kreatif, dan bermanfaat
          bagi lingkungan sekitar.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register">
            <Button
              size="lg"
              className="w-full bg-white text-primary-700 hover:bg-gray-100 sm:w-auto"
            >
              Daftar Sekarang
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/kontak">
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-white hover:bg-white/10 sm:w-auto"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { CtaSection }
