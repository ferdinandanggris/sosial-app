"use client"

import { DashboardHeader } from "./DashboardHeader"
import { BottomNav } from "@/components/ui/BottomNav"
import { LayoutDashboard, Wallet, ClipboardCheck, User } from "lucide-react"

const bottomNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/kas", label: "Kas", icon: Wallet },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardCheck },
  { href: "/dashboard/profil", label: "Profil", icon: User },
]

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-sm flex-1 overflow-y-auto p-4 pb-24">
        {children}
      </main>
      <BottomNav items={bottomNavItems} />
    </div>
  )
}

export { DashboardLayout }
