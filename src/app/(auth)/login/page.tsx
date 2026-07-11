"use client"

import { AuthCard } from "@/components/auth/AuthCard"
import { AuthForm } from "@/components/auth/AuthForm"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <AuthCard
      title="Masuk"
      subtitle="Selamat datang kembali, silakan masuk ke akun kamu"
      footer={
        <>
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Daftar Sekarang
          </Link>
        </>
      }
    >
      <AuthForm mode="login" onSuccess={handleSuccess} />
    </AuthCard>
  )
}
