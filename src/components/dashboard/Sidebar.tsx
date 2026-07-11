"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/Avatar"
import { LayoutDashboard, Calendar, User, Wallet, HandCoins, ClipboardCheck, LogOut } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/kegiatan", label: "Kegiatan Saya", icon: Calendar },
  { href: "/dashboard/kas", label: "Kas Arisan", icon: Wallet },
  { href: "/dashboard/simpan-pinjam", label: "Simpan Pinjam", icon: HandCoins },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardCheck },
  { href: "/dashboard/profil", label: "Profil", icon: User },
]

function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <aside className="flex h-full flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <Link href="/" className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            KT
          </div>
          <span className="font-bold text-gray-900">Karang Taruna</span>
        </Link>
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <Avatar src={user?.foto} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">{user?.nama}</p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Navigasi dashboard">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }
