import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="mt-4 sm:mt-0">
          <Button variant="ghost">
            {action.label}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}

export { SectionHeader }
