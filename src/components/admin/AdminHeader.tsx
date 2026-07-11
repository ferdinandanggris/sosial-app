"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Avatar } from "@/components/ui/Avatar"
import { Bell, Search, ArrowLeftRight } from "lucide-react"

function AdminHeader() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)

  return (
    <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600 text-xs font-bold text-white">
          KT
        </div>
        <span className="text-sm font-bold text-gray-900 hidden xs:inline">Admin</span>
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari..."
          className="h-8 w-full rounded-lg border border-gray-300 bg-gray-50 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Anggota
        </button>
        <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
        </button>
        <Avatar src={user?.foto} size="sm" />
      </div>
    </header>
  )
}

export { AdminHeader }
