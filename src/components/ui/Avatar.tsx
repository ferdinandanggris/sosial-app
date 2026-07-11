"use client"

import { cn } from "@/lib/utils"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { User } from "lucide-react"

interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        sizeMap[size],
        className,
      )}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="aspect-square h-full w-full object-cover"
      />
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-500" delayMs={600}>
        <User className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar }
