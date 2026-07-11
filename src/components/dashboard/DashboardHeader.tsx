"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Avatar } from "@/components/ui/Avatar"
import { Bell, ArrowLeftRight } from "lucide-react"

function DashboardHeader() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const hasAdminAccess = user?.roles?.some((r) => ["admin", "bendahara", "sekretaris"].includes(r))

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <Avatar src={user?.foto} size="sm" />
        <div>
          <p className="text-xs text-gray-500">Halo,</p>
          <p className="text-sm font-semibold text-gray-900 -mt-0.5">
            {user?.nama?.split(" ")[0] || "Pengguna"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {hasAdminAccess && (
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Admin
          </button>
        )}
        <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export { DashboardHeader }
