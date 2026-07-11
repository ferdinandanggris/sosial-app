"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, useCallback } from "react"

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

function MobileDrawer({ open, onClose, children, className }: MobileDrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, handleEscape])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-2 py-4">{children}</div>
      </div>
    </>
  )
}

export { MobileDrawer }
