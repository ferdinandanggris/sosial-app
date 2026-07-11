import { HeroSection } from "@/components/landing/HeroSection"
import { StatistikSection } from "@/components/landing/StatistikSection"
import { PostPreviewSection } from "@/components/landing/PostPreviewSection"
import { VisiMisiSection } from "@/components/landing/VisiMisiSection"
import { GaleriPreviewSection } from "@/components/landing/GaleriPreviewSection"
import { CtaSection } from "@/components/landing/CtaSection"

export default function BerandaPage() {
  return (
    <>
      <HeroSection />
      <StatistikSection />
      <PostPreviewSection />
      <VisiMisiSection />
      <GaleriPreviewSection />
      <CtaSection />
    </>
  )
}
