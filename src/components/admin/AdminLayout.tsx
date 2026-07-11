"use client"

import { AdminHeader } from "./AdminHeader"
import { BottomNav } from "@/components/ui/BottomNav"
import { LayoutDashboard, Wallet, ClipboardCheck, User } from "lucide-react"

const bottomNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kas", label: "Kas", icon: Wallet },
  { href: "/admin/absensi", label: "Absen", icon: ClipboardCheck },
  { href: "/dashboard/profil", label: "Akun", icon: User },
]

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <AdminHeader />
      <main className="mx-auto w-full max-w-sm flex-1 overflow-y-auto p-4 pb-24">
        {children}
      </main>
      <BottomNav items={bottomNavItems} />
    </div>
  )
}

export { AdminLayout }
