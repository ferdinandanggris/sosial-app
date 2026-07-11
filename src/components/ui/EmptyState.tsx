import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  message?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({
  icon,
  message = "Belum ada data",
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 text-gray-300">
        {icon || <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="mb-1 text-lg font-medium text-gray-900">{message}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {action}
    </div>
  )
}

export { EmptyState }
