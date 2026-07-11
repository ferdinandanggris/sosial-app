"use client"

import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.DialogCloseProps) {
  return <DialogPrimitive.Close {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />
}

function DialogOverlay({ className, ...props }: DialogPrimitive.DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col space-y-1.5", className)} {...props} />
}

function DialogTitle({ className, ...props }: DialogPrimitive.DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription }
