import Link from "next/link"
import { Home, Newspaper, Image, Mail } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
]

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                KT
              </div>
              <span className="text-lg font-bold text-gray-900">Karang Taruna</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Bersama Membangun Pemuda yang Kreatif, Produktif, dan Berkarakter.
              Organisasi pemuda Sukamaju yang aktif berkegiatan sejak 2015.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Menu</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Ikuti Kami</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">YouTube</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">TikTok</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Jl. Sukamaju No. 15, RT 05/RW 02</li>
              <li>Jakarta Selatan</li>
              <li>(021) 1234-5678</li>
              <li>info@karangtarunasukamaju.id</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Karang Taruna Sukamaju. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export { Footer }
