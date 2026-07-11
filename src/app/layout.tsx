import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Karang Taruna Sukamaju",
  description: "Bersama Membangun Pemuda yang Kreatif, Produktif, dan Berkarakter",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
