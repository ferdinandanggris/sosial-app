import { SectionHeader } from "./SectionHeader"
import { mockKontenLanding } from "@/lib/mock-data"
import { Target, CheckCircle2 } from "lucide-react"

function VisiMisiSection() {
  const { visiMisi } = mockKontenLanding

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Visi & Misi"
          description="Arah dan tujuan organisasi kami"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Visi</h3>
            <p className="leading-relaxed text-gray-600">{visiMisi.visi}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Misi</h3>
            <ul className="space-y-3">
              {visiMisi.misi.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { VisiMisiSection }
