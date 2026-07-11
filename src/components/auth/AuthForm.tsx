"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

interface AuthFormProps {
  mode: "login" | "register"
  onSuccess: () => void
}

function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const login = useAuthStore((s) => s.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Semua field harus diisi")
      return
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    setLoading(true)
    try {
      if (mode === "login") {
        await login(email, password)
        onSuccess()
      } else {
        await new Promise((r) => setTimeout(r, 500))
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="Masukkan email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-4 w-4" />}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {mode === "register" && (
        <Input
          label="Konfirmasi Password"
          type={showPassword ? "text" : "password"}
          placeholder="Ulangi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<Lock className="h-4 w-4" />}
          required
        />
      )}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
      <Button type="submit" loading={loading} className="w-full">
        {mode === "login" ? "Masuk" : "Daftar"}
      </Button>
      {mode === "login" && (
        <p className="text-center text-xs text-gray-400">
          Demo: admin@karangtaruna.id / password
        </p>
      )}
    </form>
  )
}

export { AuthForm }
