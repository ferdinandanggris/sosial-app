"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./Button"

interface PaginationProps {
  current: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

function Pagination({ current, total, onPageChange, className }: PaginationProps) {
  if (total <= 1) return null

  const pages: (number | "...")[] = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)} aria-label="Pagination">
      <Button
        variant="ghost"
        size="sm"
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === current ? "primary" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            aria-label={`Halaman ${page}`}
            aria-current={page === current ? "page" : undefined}
          >
            {page}
          </Button>
        ),
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={current === total}
        onClick={() => onPageChange(current + 1)}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

export { Pagination }
