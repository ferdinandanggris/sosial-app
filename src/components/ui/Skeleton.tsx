import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <Skeleton className="mb-4 h-48 w-full rounded-lg" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-2 h-3 w-1/2" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  )
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-6 flex-1" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
    </div>
  )
}

function SkeletonLine({ className }: { className?: string }) {
  return <Skeleton className={cn("h-4 w-full", className)} />
}

export { Skeleton, SkeletonCard, SkeletonTable, SkeletonLine }
