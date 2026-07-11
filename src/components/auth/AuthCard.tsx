import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"

function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-lg font-bold text-white"
            aria-label="Beranda"
          >
            KT
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
        {footer && (
          <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>
        )}
      </CardContent>
    </Card>
  )
}

export { AuthCard }
