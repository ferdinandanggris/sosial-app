"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { MobileDrawer } from "@/components/ui/MobileDrawer"
import { Menu, Home, Newspaper, Image, Mail, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/posts", label: "Artikel" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
]

const bottomNavItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/posts", label: "Artikel", icon: Newspaper },
  { href: "/galeri", label: "Galeri", icon: Image },
  { href: "/kontak", label: "Kontak", icon: Mail },
]

function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Karang Taruna Sukamaju">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              KT
            </div>
            <span className="hidden text-lg font-bold text-gray-900 sm:inline">
              Karang Taruna
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <hr className="my-4 border-gray-200" />
        <div className="flex flex-col gap-2 px-1">
          <Link href="/login" onClick={() => setDrawerOpen(false)}>
            <Button variant="secondary" className="w-full">Masuk</Button>
          </Link>
          <Link href="/register" onClick={() => setDrawerOpen(false)}>
            <Button className="w-full">Daftar</Button>
          </Link>
        </div>
      </MobileDrawer>
    </>
  )
}

export { Header, bottomNavItems }
