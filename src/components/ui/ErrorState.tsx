"use client"

import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { Button } from "./Button"

interface ErrorStateProps {
  message?: string
  description?: string
  onRetry?: () => void
  className?: string
}

function ErrorState({
  message = "Terjadi kesalahan",
  description = "Gagal memuat data. Silakan coba lagi.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 text-red-300">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h3 className="mb-1 text-lg font-medium text-gray-900">{message}</h3>
      <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Coba Lagi
        </Button>
      )}
    </div>
  )
}

export { ErrorState }
