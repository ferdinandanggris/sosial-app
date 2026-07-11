"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Avatar } from "@/components/ui/Avatar"
import { KegiatanSayaCard } from "@/components/dashboard/KegiatanSayaCard"
import { Home, Calendar, Wallet, HandCoins, ClipboardCheck, User, Bell, ArrowRight } from "lucide-react"
import { mockKegiatan } from "@/lib/mock-data"

const gridItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home, iconColor: "text-blue-600", bgColor: "bg-blue-100" },
  { href: "/dashboard/kegiatan", label: "Kegiatan", icon: Calendar, iconColor: "text-green-600", bgColor: "bg-green-100" },
  { href: "/dashboard/kas", label: "Kas", icon: Wallet, iconColor: "text-orange-600", bgColor: "bg-orange-100" },
  { href: "/dashboard/simpan-pinjam", label: "Simpan Pinjam", icon: HandCoins, iconColor: "text-pink-600", bgColor: "bg-pink-100" },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardCheck, iconColor: "text-purple-600", bgColor: "bg-purple-100" },
  { href: "/dashboard/profil", label: "Profil", icon: User, iconColor: "text-teal-600", bgColor: "bg-teal-100" },
]

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  const kegiatanAkanDatang = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return mockKegiatan.filter((k) => k.status === "published" && k.tanggal >= today).sort((a, b) => a.tanggal.localeCompare(b.tanggal)).slice(0, 3)
  }, [])

  const getStatus = (k: typeof kegiatanAkanDatang[0]) => {
    const today = new Date().toISOString().split("T")[0]
    if (k.tanggal === today) return "Hari Ini"
    return "akan datang"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <Avatar src={user?.foto} size="lg" />
          <div>
            <p className="text-sm text-primary-100">Selamat datang,</p>
            <p className="text-lg font-bold">{user?.nama}</p>
            <p className="text-xs text-primary-200 capitalize">
              {user?.roles?.includes("admin") ? "Admin" : user?.roles?.some((r) => ["bendahara", "sekretaris"].includes(r)) ? "Pengurus" : "Anggota"}
            </p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-white/80 hover:bg-white/10" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {gridItems.map((item) => {
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Kegiatan Akan Datang</h2>
          <Link
            href="/dashboard/kegiatan"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            Lihat Semua
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {kegiatanAkanDatang.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">Tidak ada kegiatan</p>
        ) : (
          <div className="space-y-2">
            {kegiatanAkanDatang.map((k) => (
              <KegiatanSayaCard key={k.id} kegiatan={k} status={getStatus(k)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
