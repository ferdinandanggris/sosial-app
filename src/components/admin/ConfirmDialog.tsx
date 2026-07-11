"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  loading?: boolean
}

function ConfirmDialog({
  open,
  onOpenChange,
  title = "Konfirmasi Hapus",
  description = "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
  confirmLabel = "Hapus",
  onConfirm,
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmDialog }
