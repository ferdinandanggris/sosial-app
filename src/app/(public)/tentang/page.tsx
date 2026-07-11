import { PageBanner } from "@/components/landing/PageBanner"
import { Target, CheckCircle2 } from "lucide-react"
import { mockKontenLanding, pengurus } from "@/lib/mock-data"

export default function TentangPage() {
  const { visiMisi } = mockKontenLanding

  return (
    <>
      <PageBanner
        title="Tentang Kami"
        description="Mengenal lebih dekat Karang Taruna Sukamaju"
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Sejarah</h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              Karang Taruna Sukamaju didirikan pada tahun 2015 oleh sekelompok pemuda
              yang peduli terhadap perkembangan lingkungan sekitar. Berawal dari
              kegiatan ronda malam dan kerja bakti, organisasi ini berkembang menjadi
              wadah pengembangan potensi pemuda yang aktif dan kreatif.
            </p>
            <p className="mb-12 leading-relaxed text-gray-600">
              Hingga saat ini, Karang Taruna Sukamaju telah menaungi 47 anggota aktif
              dan menyelenggarakan puluhan kegiatan di berbagai bidang mulai dari
              pelatihan, sosial, hingga acara kebudayaan.
            </p>
          </div>

          <div className="mb-12 grid gap-8 lg:grid-cols-2">
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

          <h2 className="mb-8 text-2xl font-bold text-gray-900 text-center">
            Pengurus Karang Taruna
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pengurus.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-blue-100 text-2xl font-bold text-primary-600">
                  {p.nama.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900">{p.nama}</h3>
                <p className="mt-1 text-sm text-primary-600">{p.jabatan}</p>
                <p className="mt-1 text-xs text-gray-400">Periode {p.periode}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
