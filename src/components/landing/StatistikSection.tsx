import { Users, Calendar, Target, Clock } from "lucide-react"
import { mockKontenLanding } from "@/lib/mock-data"

const statItems = [
  { icon: Users, label: "Anggota Aktif", value: mockKontenLanding.statistik.totalAnggota },
  { icon: Calendar, label: "Kegiatan", value: mockKontenLanding.statistik.totalKegiatan },
  { icon: Target, label: "Program", value: mockKontenLanding.statistik.totalProgram },
  { icon: Clock, label: "Berdiri", value: mockKontenLanding.statistik.tahunBerdiri },
]

function StatistikSection() {
  return (
    <section className="relative -mt-16 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 rounded-full bg-primary-50 p-3 text-primary-600">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {typeof item.value === "number" && item.label === "Berdiri" ? "" : item.value}
                  {typeof item.value === "number" && item.label !== "Berdiri" ? "+" : item.value}
                </span>
                <span className="mt-1 text-sm text-gray-500">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { StatistikSection }
