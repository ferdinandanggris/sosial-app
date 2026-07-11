"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BottomNavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface BottomNavProps {
  items: BottomNavItem[]
  className?: string
}

function BottomNav({ items, className }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around rounded-2xl border border-gray-200 bg-white/90 px-2 py-2 shadow-lg backdrop-blur-md",
        className,
      )}
      aria-label="Navigasi bawah"
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs transition-colors",
              isActive
                ? "bg-primary-50 text-primary-700 font-semibold"
                : "text-gray-500 hover:text-gray-700",
            )}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className={cn("h-5 w-5", isActive && "text-primary-600")} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export { BottomNav, type BottomNavItem }
