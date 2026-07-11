"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { PageHeader } from "@/components/admin/PageHeader"
import { LayoutDashboard, Newspaper, Users, Wallet, HandCoins, ClipboardCheck, Image, FileText, BookOpen } from "lucide-react"

interface GridItem {
  href: string
  label: string
  icon: React.ElementType
  iconColor: string
  bgColor: string
  roles: string[]
}

const gridItems: GridItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, iconColor: "text-blue-600", bgColor: "bg-blue-100", roles: ["admin", "bendahara", "sekretaris"] },
  { href: "/admin/kegiatan", label: "Kegiatan", icon: Newspaper, iconColor: "text-green-600", bgColor: "bg-green-100", roles: ["admin", "sekretaris"] },
  { href: "/admin/anggota", label: "Anggota", icon: Users, iconColor: "text-teal-600", bgColor: "bg-teal-100", roles: ["admin", "sekretaris"] },
  { href: "/admin/kas", label: "Kas", icon: Wallet, iconColor: "text-orange-600", bgColor: "bg-orange-100", roles: ["admin", "bendahara"] },
  { href: "/admin/simpan-pinjam", label: "Simpan Pinjam", icon: HandCoins, iconColor: "text-pink-600", bgColor: "bg-pink-100", roles: ["admin", "bendahara"] },
  { href: "/admin/absensi", label: "Absensi", icon: ClipboardCheck, iconColor: "text-purple-600", bgColor: "bg-purple-100", roles: ["admin", "sekretaris"] },
  { href: "/admin/posts", label: "Posts", icon: BookOpen, iconColor: "text-rose-600", bgColor: "bg-rose-100", roles: ["admin"] },
  { href: "/admin/galeri", label: "Galeri", icon: Image, iconColor: "text-yellow-600", bgColor: "bg-yellow-100", roles: ["admin"] },
  { href: "/admin/konten", label: "Konten Landing", icon: FileText, iconColor: "text-indigo-600", bgColor: "bg-indigo-100", roles: ["admin"] },
]

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user)
  const userRoles: string[] = user?.roles || []

  const allowedItems = gridItems.filter((item) => item.roles.some((r) => userRoles.includes(r)))

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Panel admin Karang Taruna" />

      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {allowedItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-start gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div className={`p-3 rounded-2xl ${item.bgColor} relative`}>
                <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
              </div>
              <span className="text-[10px] text-center font-medium text-slate-700 leading-tight px-1">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
