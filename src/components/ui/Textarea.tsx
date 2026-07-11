"use client"

import { forwardRef, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea, type TextareaProps }
