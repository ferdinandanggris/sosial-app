"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Avatar } from "@/components/ui/Avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Camera } from "lucide-react"

export default function ProfilPage() {
  const { user, updateProfile } = useAuthStore()
  const [nama, setNama] = useState(user?.nama || "")
  const [email, setEmail] = useState(user?.email || "")
  const [noHp, setNoHp] = useState(user?.noHp || "")
  const [alamat, setAlamat] = useState(user?.alamat || "")
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ nama, email, noHp, alamat })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profil Saya</h1>

      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <Avatar src={user?.foto} size="lg" className="h-24 w-24" />
          <button
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white shadow-sm"
            aria-label="Ubah foto"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-500">Klik ikon kamera untuk mengubah foto</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Informasi Pribadi</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="No. HP" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
            <Input label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            <div className="flex items-center gap-4">
              <Button type="submit">Simpan Perubahan</Button>
              {saved && (
                <span className="text-sm text-green-600">Profil berhasil diperbarui</span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
