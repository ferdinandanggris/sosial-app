"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Skeleton } from "@/components/ui/Skeleton"

function LoadingSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => { setMounted(true) }, [])

  const adminRoles = ["admin", "bendahara", "sekretaris"]
  const isAdminUser = user?.roles?.some((r) => adminRoles.includes(r))

  useEffect(() => {
    if (!mounted) return
    if (!isAuthenticated) {
      router.replace("/login")
    } else if (!isAdminUser) {
      router.replace("/dashboard")
    }
  }, [mounted, isAuthenticated, isAdminUser, router])

  if (!mounted) return <LoadingSkeleton />
  if (!isAuthenticated || !isAdminUser) return <LoadingSkeleton />

  return <AdminLayout>{children}</AdminLayout>
}
