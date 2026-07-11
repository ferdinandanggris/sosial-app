import { User, Kegiatan, GaleriItem, KontenLanding, KasTransaksi, Tagihan, Absensi, PinjamanProgram, Pinjaman, AngsuranPinjaman, Post, Setting } from "@/types"

export const mockUsers: User[] = [
  {
    id: "1",
    nama: "Admin Karang Taruna",
    email: "admin@karangtaruna.id",
    roles: ["admin"],
    foto: "",
    noHp: "08123456789",
    alamat: "Jl. Merdeka No. 1, Jakarta",
    tanggalBergabung: "2024-01-15",
    status: "aktif",
  },
  {
    id: "2",
    nama: "Budi Santoso",
    email: "budi@email.com",
    roles: ["member"],
    foto: "",
    noHp: "08198765432",
    alamat: "Jl. Kenangan No. 5, Jakarta",
    tanggalBergabung: "2025-03-20",
    status: "aktif",
  },
  {
    id: "3",
    nama: "Siti Rahmawati",
    email: "siti@email.com",
    roles: ["member"],
    foto: "",
    noHp: "08234567890",
    alamat: "Jl. Damai No. 10, Jakarta",
    tanggalBergabung: "2025-06-01",
    status: "aktif",
  },
  {
    id: "4",
    nama: "Ani Rahmawati",
    email: "ani@email.com",
    roles: ["member", "bendahara"],
    foto: "",
    noHp: "08345678901",
    alamat: "Jl. Mawar No. 3, Jakarta",
    tanggalBergabung: "2024-06-01",
    status: "aktif",
  },
  {
    id: "5",
    nama: "Rudi Hartono",
    email: "rudi@email.com",
    roles: ["member", "sekretaris"],
    foto: "",
    noHp: "08456789012",
    alamat: "Jl. Melati No. 7, Jakarta",
    tanggalBergabung: "2024-08-15",
    status: "aktif",
  },
]

export const mockKegiatan: Kegiatan[] = [
  {
    id: "1",
    judul: "Kerja Bakti Pembersihan Lingkungan",
    slug: "kerja-bakti-pembersihan-lingkungan",
    deskripsi: "Aksi bersih-bersih lingkungan RT 05/RW 02 dalam rangka menyambut HUT RI ke-81",
    konten:
      "Kerja bakti ini akan dilaksanakan pada hari Minggu, melibatkan seluruh warga RT 05. Kegiatan meliputi pembersihan got, pengecatan pagar, dan penataan taman lingkungan. Ayo bersama-sama kita jaga kebersihan lingkungan kita!",
    kategori: "sosial",
    tanggal: "2026-07-15",
    lokasi: "RT 05/RW 02, Kelurahan Sukamaju",
    foto: ["/placeholder.svg"],
    status: "published",
    penulisId: "1",
    dendaAlpha: 10000,
    createdAt: "2026-07-01T08:00:00Z",
    updatedAt: "2026-07-01T08:00:00Z",
  },
  {
    id: "2",
    judul: "Pelatihan Digital Marketing untuk Pemuda",
    slug: "pelatihan-digital-marketing-untuk-pemuda",
    deskripsi: "Pelatihan gratis digital marketing untuk anggota Karang Taruna agar siap bersaing di era digital",
    konten:
      "Pelatihan ini akan menghadirkan pembicara profesional di bidang digital marketing. Materi meliputi SEO, social media marketing, dan content creation. Sertifikat akan diberikan kepada peserta yang hadir full session.",
    kategori: "pelatihan",
    tanggal: "2026-08-05",
    lokasi: "Aula Kelurahan Sukamaju",
    foto: ["/placeholder.svg"],
    status: "published",
    penulisId: "1",
    dendaAlpha: 15000,
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-12T14:00:00Z",
  },
  {
    id: "3",
    judul: "Lomba 17 Agustus Antar RT",
    slug: "lomba-17-agustus-antar-rt",
    deskripsi: "Perlombaan seru dalam rangka memeriahkan HUT Kemerdekaan RI ke-81",
    konten:
      "Berbagai lomba akan diselenggarakan: balap karung, panjat pinang, tarik tambang, dan lomba khas 17-an lainnya. Setiap RT diharapkan mengirimkan perwakilannya. Hadiah menarik untuk para pemenang!",
    kategori: "acara",
    tanggal: "2026-08-17",
    lokasi: "Lapangan Sukamaju",
    foto: ["/placeholder.svg"],
    status: "published",
    penulisId: "1",
    dendaAlpha: 20000,
    createdAt: "2026-07-20T09:00:00Z",
    updatedAt: "2026-07-20T09:00:00Z",
  },
  {
    id: "4",
    judul: "Program Donasi untuk Korban Bencana",
    slug: "program-donasi-untuk-korban-bencana",
    deskripsi: "Galang dana dan bantuan untuk korban bencana alam di daerah tetangga",
    konten:
      "Karang Taruna mengadakan program donasi untuk membantu korban bencana alam. Donasi dapat berupa uang, pakaian layak pakai, atau makanan. Posko donasi dibuka setiap hari di sekretariat Karang Taruna.",
    kategori: "sosial",
    tanggal: "2026-09-01",
    lokasi: "Sekretariat Karang Taruna",
    foto: ["/placeholder.svg"],
    status: "draft",
    penulisId: "1",
    dendaAlpha: 5000,
    createdAt: "2026-08-10T11:00:00Z",
    updatedAt: "2026-08-10T11:00:00Z",
  },
  {
    id: "5",
    judul: "Workshop Kewirausahaan untuk Pemuda",
    slug: "workshop-kewirausahaan-untuk-pemuda",
    deskripsi: "Workshop membangun bisnis dari nol untuk pemuda Karang Taruna",
    konten:
      "Workshop ini akan membahas cara memulai bisnis dengan modal minimal, strategi pemasaran digital, dan manajemen keuangan sederhana. Narasumber adalah pengusaha muda sukses dari lingkungan sekitar.",
    kategori: "pelatihan",
    tanggal: "2026-09-20",
    lokasi: "Gedung Serbaguna Sukamaju",
    foto: ["/placeholder.svg"],
    status: "draft",
    penulisId: "2",
    dendaAlpha: 10000,
    createdAt: "2026-08-25T13:00:00Z",
    updatedAt: "2026-08-26T09:00:00Z",
  },
]

export const mockPosts: Post[] = [
  {
    id: "post1",
    judul: "Karang Taruna Sukamaju Gelar Kerja Bakti Nasional",
    slug: "karang-taruna-sukamaju-gelar-kerja-bakti-nasional",
    konten: "Karang Taruna Sukamaju sukses menggelar kerja bakti nasional yang diikuti oleh puluhan pemuda dari berbagai RT. Kegiatan ini bertujuan untuk meningkatkan kesadaran akan pentingnya gotong royong dan kebersihan lingkungan. Acara dimulai pukul 07.00 WIB dan berlangsung meriah dengan partisipasi aktif dari seluruh anggota.",
    excerpt: "Puluhan pemuda Sukamaju mengikuti kerja bakti nasional dalam rangka meningkatkan kepedulian lingkungan.",
    coverImage: "/placeholder.svg",
    kategori: "berita",
    tags: ["kerja bakti", "lingkungan", "gotong royong"],
    status: "published",
    penulisId: "1",
    createdAt: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-15T08:00:00Z",
  },
  {
    id: "post2",
    judul: "Tips Mengelola Keuangan untuk Pemuda Milenial",
    slug: "tips-mengelola-keuangan-untuk-pemuda-milenial",
    konten: "Mengelola keuangan di usia muda adalah skill penting yang harus dimiliki setiap pemuda. Mulailah dengan mencatat pengeluaran harian, buat anggaran bulanan, dan jangan lupa menyisihkan sebagian penghasilan untuk tabungan. Karang Taruna Sukamaju secara rutin mengadakan workshop literasi keuangan untuk membantu pemuda mengelola keuangan dengan bijak.",
    excerpt: "Pelajari cara mengelola keuangan yang baik untuk masa depan yang lebih cerah.",
    coverImage: "/placeholder.svg",
    kategori: "artikel",
    tags: ["keuangan", "tips", "literasi keuangan", "pemuda"],
    status: "published",
    penulisId: "1",
    createdAt: "2026-06-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
  },
  {
    id: "post3",
    judul: "Pengumuman: Pendaftaran Anggota Baru Dibuka",
    slug: "pengumuman-pendaftaran-anggota-baru-dibuka",
    konten: "Karang Taruna Sukamaju membuka pendaftaran anggota baru untuk periode 2026/2027. Persyaratan: berusia 16-30 tahun, berdomisili di Kelurahan Sukamaju, dan bersedia mengikuti seluruh rangkaian kegiatan. Pendaftaran dibuka mulai 1 Juli hingga 31 Agustus 2026. Ayo gabung dan jadi bagian dari perubahan positif!",
    excerpt: "Pendaftaran anggota baru Karang Taruna Sukamaju periode 2026/2027 telah dibuka.",
    coverImage: "/placeholder.svg",
    kategori: "pengumuman",
    tags: ["pendaftaran", "anggota baru", "rekrutmen"],
    status: "published",
    penulisId: "1",
    createdAt: "2026-06-20T09:00:00Z",
    updatedAt: "2026-06-20T09:00:00Z",
  },
  {
    id: "post4",
    judul: "Pentingnya Peran Pemuda dalam Pembangunan Desa",
    slug: "pentingnya-peran-pemuda-dalam-pembangunan-desa",
    konten: "Pemuda memiliki peran strategis dalam pembangunan desa. Sebagai agen perubahan, pemuda dapat menjadi motor penggerak inovasi dan kreativitas di lingkungannya. Karang Taruna Sukamaju berkomitmen untuk terus memberdayakan pemuda melalui berbagai program pelatihan dan pengembangan diri.",
    excerpt: "Pemuda adalah agen perubahan yang memiliki peran vital dalam memajukan desa.",
    coverImage: "/placeholder.svg",
    kategori: "artikel",
    tags: ["pemuda", "pembangunan", "desa", "pemberdayaan"],
    status: "draft",
    penulisId: "2",
    createdAt: "2026-06-25T14:00:00Z",
    updatedAt: "2026-06-25T14:00:00Z",
  },
  {
    id: "post5",
    judul: "Jadwal Kegiatan Bulan Juli 2026",
    slug: "jadwal-kegiatan-bulan-juli-2026",
    konten: "Berikut adalah jadwal kegiatan Karang Taruna Sukamaju untuk bulan Juli 2026: 1) Workshop Digital Marketing — 10 Juli, 2) Rapat Anggota Bulanan — 15 Juli, 3) Lomba 17-an persiapan — 20 Juli, 4) Kerja Bakti Lingkungan — 25 Juli. Semua anggota diharapkan hadir dan berpartisipasi aktif.",
    excerpt: "Simak jadwal lengkap kegiatan Karang Taruna Sukamaju bulan Juli 2026.",
    coverImage: "/placeholder.svg",
    kategori: "pengumuman",
    tags: ["jadwal", "kegiatan", "juli 2026"],
    status: "published",
    penulisId: "1",
    createdAt: "2026-06-28T07:00:00Z",
    updatedAt: "2026-06-28T07:00:00Z",
  },
]

export const mockGaleri: GaleriItem[] = [
  { id: "1", url: "/placeholder.svg", caption: "Kerja Bakti 2025", kategori: "kegiatan", createdAt: "2025-06-15" },
  { id: "2", url: "/placeholder.svg", caption: "Pelatihan Digital Marketing", kategori: "pelatihan", createdAt: "2025-08-01" },
  { id: "3", url: "/placeholder.svg", caption: "Lomba 17 Agustus 2025", kategori: "kegiatan", createdAt: "2025-08-17" },
  { id: "4", url: "/placeholder.svg", caption: "Rapat Anggota Bulanan", kategori: "rapat", createdAt: "2025-09-10" },
  { id: "5", url: "/placeholder.svg", caption: "Bakti Sosial", kategori: "kegiatan", createdAt: "2025-10-01" },
  { id: "6", url: "/placeholder.svg", caption: "Pelatihan Public Speaking", kategori: "pelatihan", createdAt: "2025-11-05" },
]

export const mockKontenLanding: KontenLanding = {
  hero: {
    judul: "Karang Taruna Sukamaju",
    subjudul: "Bersama Membangun Pemuda yang Kreatif, Produktif, dan Berkarakter",
    gambar: "/placeholder.svg",
  },
  visiMisi: {
    visi: "Menjadi organisasi pemuda yang mandiri, kreatif, dan berkontribusi aktif dalam pembangunan masyarakat",
    misi: [
      "Mengembangkan potensi dan kreativitas pemuda melalui berbagai program pelatihan",
      "Meningkatkan partisipasi pemuda dalam kegiatan sosial dan pembangunan lingkungan",
      "Membangun jaringan kerjasama dengan berbagai pihak untuk pengembangan organisasi",
      "Menciptakan lingkungan yang kondusif bagi pertumbuhan dan perkembangan pemuda",
    ],
  },
  statistik: {
    totalAnggota: 47,
    totalKegiatan: 28,
    totalProgram: 12,
    tahunBerdiri: 2015,
  },
  kontak: {
    alamat: "Jl. Sukamaju No. 15, RT 05/RW 02, Kelurahan Sukamaju, Jakarta Selatan",
    noTelp: "(021) 1234-5678",
    email: "info@karangtarunasukamaju.id",
    mapsUrl: "https://maps.google.com",
    sosialMedia: {
      instagram: "@karangtarunasukamaju",
      youtube: "Karang Taruna Sukamaju",
      tiktok: "@karangtarunasukamaju",
    },
  },
}

export const mockKasTransaksi: KasTransaksi[] = [
  { id: "k1", jenis: "pemasukan", kategori: "iuran", jumlah: 500000, saldo: 0, deskripsi: "Iuran anggota bulan Juni", tanggal: "2026-06-01", dicatatOleh: "4", anggotaId: "2" },
  { id: "k2", jenis: "pemasukan", kategori: "iuran", jumlah: 500000, saldo: 0, deskripsi: "Iuran anggota bulan Juni", tanggal: "2026-06-01", dicatatOleh: "4", anggotaId: "3" },
  { id: "k3", jenis: "pemasukan", kategori: "donasi", jumlah: 2000000, saldo: 0, deskripsi: "Donasi dari PT. Maju Bersama", tanggal: "2026-06-10", dicatatOleh: "4" },
  { id: "k4", jenis: "pengeluaran", kategori: "kegiatan", jumlah: 750000, saldo: 0, deskripsi: "Biaya konsumsi kerja bakti", tanggal: "2026-06-15", dicatatOleh: "4" },
  { id: "k5", jenis: "pengeluaran", kategori: "operasional", jumlah: 150000, saldo: 0, deskripsi: "Beli alat tulis sekretariat", tanggal: "2026-06-20", dicatatOleh: "4" },
  { id: "k6", jenis: "pemasukan", kategori: "iuran", jumlah: 500000, saldo: 0, deskripsi: "Iuran anggota bulan Juli", tanggal: "2026-07-01", dicatatOleh: "4", anggotaId: "2" },
  { id: "k7", jenis: "pemasukan", kategori: "iuran", jumlah: 500000, saldo: 0, deskripsi: "Iuran anggota bulan Juli", tanggal: "2026-07-01", dicatatOleh: "4", anggotaId: "3" },
  { id: "k8", jenis: "pemasukan", kategori: "denda", jumlah: 10000, saldo: 0, deskripsi: "Denda alpha Budi - Kerja Bakti", tanggal: "2026-07-16", dicatatOleh: "4", anggotaId: "2" },
  { id: "k9", jenis: "pengeluaran", kategori: "kegiatan", jumlah: 1200000, saldo: 0, deskripsi: "Biaya sewa sound system 17-an", tanggal: "2026-08-10", dicatatOleh: "4" },
  { id: "k10", jenis: "pengeluaran", kategori: "kegiatan", jumlah: 300000, saldo: 0, deskripsi: "Beli hadiah lomba", tanggal: "2026-08-15", dicatatOleh: "4" },
  { id: "k11", jenis: "pemasukan", kategori: "iuran", jumlah: 500000, saldo: 0, deskripsi: "Iuran anggota bulan Agustus", tanggal: "2026-08-01", dicatatOleh: "4", anggotaId: "2" },
  { id: "k12", jenis: "pemasukan", kategori: "lainnya", jumlah: 100000, saldo: 0, deskripsi: "Uang parkir acara 17-an", tanggal: "2026-08-17", dicatatOleh: "4" },
]

export function recalculateSaldo(transactions: KasTransaksi[]) {
  const sorted = [...transactions].sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.id.localeCompare(b.id))
  let running = 0
  for (const t of sorted) {
    running += t.jenis === "pemasukan" ? t.jumlah : -t.jumlah
    t.saldo = running
  }
}

recalculateSaldo(mockKasTransaksi)

export const mockTagihan: Tagihan[] = [
  { id: "t1", anggotaId: "2", kegiatanId: "1", jenis: "denda_alpha", jumlah: 10000, status: "belum_dibayar", createdAt: "2026-07-16" },
  { id: "t2", anggotaId: "3", jenis: "iuran_anggota", jumlah: 50000, status: "belum_dibayar", createdAt: "2026-08-01" },
  { id: "t3", anggotaId: "2", jenis: "iuran_anggota", jumlah: 50000, status: "lunas", createdAt: "2026-06-01", lunasAt: "2026-06-05" },
]

export const pengurus = [
  {
    id: "1",
    nama: "Ahmad Fauzi",
    jabatan: "Ketua Karang Taruna",
    foto: "",
    periode: "2024-2026",
  },
  {
    id: "2",
    nama: "Dewi Sartika",
    jabatan: "Wakil Ketua",
    foto: "",
    periode: "2024-2026",
  },
  {
    id: "3",
    nama: "Rudi Hartono",
    jabatan: "Sekretaris",
    foto: "",
    periode: "2024-2026",
  },
  {
    id: "4",
    nama: "Ani Rahmawati",
    jabatan: "Bendahara",
    foto: "",
    periode: "2024-2026",
  },
]

export const mockAbsensi: Absensi[] = [
  { id: "a1", kegiatanId: "1", anggotaId: "2", status: "hadir" },
  { id: "a2", kegiatanId: "1", anggotaId: "3", status: "hadir" },
  { id: "a3", kegiatanId: "1", anggotaId: "4", status: "izin", keterangan: "Ada acara keluarga" },
  { id: "a4", kegiatanId: "1", anggotaId: "5", status: "hadir" },
  { id: "a5", kegiatanId: "2", anggotaId: "2", status: "alpha" },
  { id: "a6", kegiatanId: "2", anggotaId: "3", status: "hadir" },
  { id: "a7", kegiatanId: "2", anggotaId: "4", status: "hadir" },
  { id: "a8", kegiatanId: "2", anggotaId: "5", status: "hadir" },
]

export const mockPinjamanProgram: PinjamanProgram[] = [
  { id: "pp1", nama: "Program Arisan Lebaran", tanggalBuka: "2026-04-01", tenor: 6, bungaPerUnit: 2500, denda: 5000, status: "aktif" },
  { id: "pp2", nama: "Program Modal Usaha", tanggalBuka: "2026-01-01", tenor: 6, bungaPerUnit: 2500, denda: 5000, status: "ditutup", tanggalTutup: "2026-06-01" },
]

export const mockPinjaman: Pinjaman[] = [
  { id: "p1", programId: "pp1", anggotaId: "2", jumlahPinjaman: 200000, sisaPinjaman: 200000, unit: 2 },
  { id: "p2", programId: "pp1", anggotaId: "3", jumlahPinjaman: 100000, sisaPinjaman: 100000, unit: 1 },
  { id: "p3", programId: "pp1", anggotaId: "4", jumlahPinjaman: 100000, sisaPinjaman: 50000, unit: 1 },
  { id: "p4", programId: "pp2", anggotaId: "3", jumlahPinjaman: 300000, sisaPinjaman: 0, unit: 3 },
  { id: "p5", programId: "pp2", anggotaId: "5", jumlahPinjaman: 100000, sisaPinjaman: 0, unit: 1 },
]

export const mockAngsuran: AngsuranPinjaman[] = [
  { id: "ang1", pinjamanId: "p1", programId: "pp1", anggotaId: "2", jenis: "bunga", jumlah: 5000, bulan: 1, tanggal: "2026-05-01", status: "lunas" },
  { id: "ang2", pinjamanId: "p1", programId: "pp1", anggotaId: "2", jenis: "bunga", jumlah: 5000, bulan: 2, tanggal: "2026-06-01", status: "lunas" },
  { id: "ang3", pinjamanId: "p1", programId: "pp1", anggotaId: "2", jenis: "bunga", jumlah: 5000, bulan: 3, tanggal: "2026-07-01", status: "lunas" },
  { id: "ang4", pinjamanId: "p1", programId: "pp1", anggotaId: "2", jenis: "bunga", jumlah: 5000, bulan: 4, tanggal: "2026-08-01", status: "terlambat" },
  { id: "ang5", pinjamanId: "p2", programId: "pp1", anggotaId: "3", jenis: "bunga", jumlah: 2500, bulan: 1, tanggal: "2026-05-01", status: "lunas" },
  { id: "ang6", pinjamanId: "p2", programId: "pp1", anggotaId: "3", jenis: "bunga", jumlah: 2500, bulan: 2, tanggal: "2026-06-01", status: "lunas" },
  { id: "ang7", pinjamanId: "p3", programId: "pp1", anggotaId: "4", jenis: "bunga", jumlah: 2500, bulan: 1, tanggal: "2026-05-01", status: "lunas" },
  { id: "ang8", pinjamanId: "p3", programId: "pp1", anggotaId: "4", jenis: "bunga", jumlah: 2500, bulan: 2, tanggal: "2026-06-01", status: "lunas" },
  { id: "ang9", pinjamanId: "p3", programId: "pp1", anggotaId: "4", jenis: "pokok", jumlah: 50000, tanggal: "2026-07-01", status: "lunas" },
  { id: "ang10", pinjamanId: "p4", programId: "pp2", anggotaId: "3", jenis: "bunga", jumlah: 7500, bulan: 1, tanggal: "2026-02-01", status: "lunas" },
  { id: "ang11", pinjamanId: "p4", programId: "pp2", anggotaId: "3", jenis: "bunga", jumlah: 7500, bulan: 2, tanggal: "2026-03-01", status: "lunas" },
  { id: "ang12", pinjamanId: "p4", programId: "pp2", anggotaId: "3", jenis: "pokok", jumlah: 300000, tanggal: "2026-04-01", status: "lunas" },
  { id: "ang13", pinjamanId: "p5", programId: "pp2", anggotaId: "5", jenis: "bunga", jumlah: 2500, bulan: 1, tanggal: "2026-02-01", status: "lunas" },
  { id: "ang14", pinjamanId: "p5", programId: "pp2", anggotaId: "5", jenis: "pokok", jumlah: 100000, tanggal: "2026-04-01", status: "lunas" },
]

export const mockSettings: Setting[] = [
  { key: "pinjaman.defaultJumlah", value: 100000 },
  { key: "pinjaman.bunga", value: 2500 },
  { key: "pinjaman.denda", value: 5000 },
]
