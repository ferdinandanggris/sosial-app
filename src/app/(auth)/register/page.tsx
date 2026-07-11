"use client"

import { AuthCard } from "@/components/auth/AuthCard"
import { AuthForm } from "@/components/auth/AuthForm"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/login?registered=true")
  }

  return (
    <AuthCard
      title="Daftar"
      subtitle="Buat akun baru untuk bergabung dengan Karang Taruna"
      footer={
        <>
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Masuk
          </Link>
        </>
      }
    >
      <AuthForm mode="register" onSuccess={handleSuccess} />
    </AuthCard>
  )
}
