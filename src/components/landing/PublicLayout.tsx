import { Header, bottomNavItems } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { BottomNav } from "@/components/ui/BottomNav"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomNav items={bottomNavItems} />
    </div>
  )
}
