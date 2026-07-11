"use client"

import { useAuthStore } from "@/store/auth-store"
import { Avatar } from "@/components/ui/Avatar"

function WelcomeCard() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar src={user?.foto} size="lg" />
        <div>
          <p className="text-sm text-primary-100">Selamat datang,</p>
          <h2 className="text-xl font-bold">{user?.nama}</h2>
          <p className="mt-1 text-sm text-primary-200">
            {user?.roles?.includes("admin") ? "Admin" : user?.roles?.some((r) => ["bendahara", "sekretaris"].includes(r)) ? "Pengurus" : "Anggota Karang Taruna"}
          </p>
        </div>
      </div>
    </div>
  )
}

export { WelcomeCard }
