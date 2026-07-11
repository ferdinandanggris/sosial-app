"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import type { User } from "@/types"

const allRoles = [
  { value: "admin", label: "Admin" },
  { value: "bendahara", label: "Bendahara" },
  { value: "sekretaris", label: "Sekretaris" },
  { value: "member", label: "Member" },
]

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
]

const statusOptions = [
  { value: "aktif", label: "Aktif" },
  { value: "nonaktif", label: "Nonaktif" },
]

interface AnggotaFormProps {
  initial?: User
  onSave: (data: Partial<User>) => void
  onCancel: () => void
  loading?: boolean
}

function AnggotaForm({ initial, onSave, onCancel, loading }: AnggotaFormProps) {
  const [nama, setNama] = useState(initial?.nama || "")
  const [email, setEmail] = useState(initial?.email || "")
  const [noHp, setNoHp] = useState(initial?.noHp || "")
  const [alamat, setAlamat] = useState(initial?.alamat || "")
  const [roles, setRoles] = useState<string[]>(initial?.roles || ["member"])
  const [status, setStatus] = useState(initial?.status || "aktif")

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roles.length === 0) return
    onSave({ nama, email, noHp, alamat, roles: roles as User["roles"], status: status as User["status"] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="No. HP" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
      <Input label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
        <div className="flex flex-wrap gap-3">
          {allRoles.map((r) => (
            <label key={r.value} className="flex items-center gap-1.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={roles.includes(r.value)}
                onChange={() => toggleRole(r.value)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              {r.label}
            </label>
          ))}
        </div>
        {roles.length === 0 && <p className="mt-1 text-xs text-red-500">Pilih minimal 1 role</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" options={statusOptions} value={status} onValueChange={(v) => setStatus(v as "aktif" | "nonaktif")} />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
        <Button type="submit" loading={loading}>{initial ? "Simpan" : "Tambah"}</Button>
      </div>
    </form>
  )
}

export { AnggotaForm }
