import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Table2 } from "lucide-react"

export interface Column<T> {
  key: string
  header: string
  cell: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  error?: boolean
  onRetry?: () => void
  emptyMessage?: string
  emptyDescription?: string
}

function DataTable<T>({
  columns,
  data,
  loading,
  error,
  onRetry,
  emptyMessage,
  emptyDescription,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="hidden sm:flex sm:gap-4">
          {columns.map((col) => (
            <Skeleton key={col.key} className="h-8 flex-1" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {columns.map((col) => (
              <Skeleton key={col.key} className="h-6 flex-1" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />
  }

  if (!data.length) {
    return (
      <EmptyState
        icon={<Table2 className="h-12 w-12" />}
        message={emptyMessage || "Belum ada data"}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("whitespace-nowrap px-4 py-3 text-sm text-gray-700", col.className)}
                >
                  {col.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable }
