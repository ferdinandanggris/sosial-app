"use client"

import { cn } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: SelectOption[]
  disabled?: boolean
  className?: string
}

function Select({ label, error, placeholder, value, onValueChange, options, disabled, className }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            !value && "text-gray-400",
            error && "border-red-500",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder || "Pilih..."} />
          <SelectPrimitive.Icon>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary-700"
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export { Select, type SelectOption, type SelectProps }
