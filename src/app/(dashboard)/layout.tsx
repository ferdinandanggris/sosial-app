"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login")
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted) return <LoadingSkeleton />
  if (!isAuthenticated) return <LoadingSkeleton />

  return <DashboardLayout>{children}</DashboardLayout>
}
