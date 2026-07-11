"use client"

import { PageBanner } from "@/components/landing/PageBanner"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { MapPin, Phone, Mail, Send, Camera, PlayCircle, Music } from "lucide-react"
import { mockKontenLanding } from "@/lib/mock-data"
import { useState } from "react"

export default function KontakPage() {
  const { kontak } = mockKontenLanding
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageBanner
        title="Hubungi Kami"
        description="Punya pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi kami"
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Informasi Kontak</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Alamat</h3>
                    <p className="text-sm text-gray-600">{kontak.alamat}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Telepon</h3>
                    <p className="text-sm text-gray-600">{kontak.noTelp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600">{kontak.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-medium text-gray-900">Ikuti Kami</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <Camera className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                    aria-label="YouTube"
                  >
                    <PlayCircle className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <Music className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Peta Lokasi
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Kirim Pesan</h2>
              {submitted ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="mb-3 text-3xl">✅</div>
                  <h3 className="text-lg font-semibold text-green-800">Pesan Terkirim!</h3>
                  <p className="mt-1 text-sm text-green-600">
                    Terima kasih, pesanmu sudah kami terima. Kami akan menghubungi kamu segera.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input label="Nama Lengkap" placeholder="Masukkan nama kamu" required />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Masukkan email kamu"
                    required
                  />
                  <Input label="Subjek" placeholder="Subjek pesan" required />
                  <Textarea
                    label="Pesan"
                    placeholder="Tulis pesan kamu di sini..."
                    rows={5}
                    required
                  />
                  <Button type="submit" className="gap-2">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
