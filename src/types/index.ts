export interface User {
  id: string
  nama: string
  email: string
  roles: ("admin" | "bendahara" | "sekretaris" | "member")[]
  foto?: string
  noHp?: string
  alamat?: string
  tanggalBergabung: string
  status: "aktif" | "nonaktif"
}

export interface Kegiatan {
  id: string
  judul: string
  slug: string
  deskripsi: string
  konten: string
  kategori: "acara" | "pelatihan" | "sosial" | "lainnya"
  tanggal: string
  lokasi: string
  foto: string[]
  status: "draft" | "published"
  penulisId: string
  dendaAlpha: number
  createdAt: string
  updatedAt: string
}

export interface Absensi {
  id: string
  kegiatanId: string
  anggotaId: string
  status: "hadir" | "izin" | "alpha"
  keterangan?: string
}

export interface RekapAbsensi {
  kegiatanId: string
  total: number
  hadir: number
  izin: number
  alpha: number
}

export interface GaleriItem {
  id: string
  url: string
  caption: string
  kategori: string
  createdAt: string
}

export interface KontenLanding {
  hero: {
    judul: string
    subjudul: string
    gambar: string
  }
  visiMisi: {
    visi: string
    misi: string[]
  }
  statistik: {
    totalAnggota: number
    totalKegiatan: number
    totalProgram: number
    tahunBerdiri: number
  }
  kontak: {
    alamat: string
    noTelp: string
    email: string
    mapsUrl: string
    sosialMedia: {
      instagram?: string
      youtube?: string
      tiktok?: string
    }
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export type KegiatanFilter = {
  kategori?: string
  search?: string
  sort?: "terbaru" | "terlama"
}

export interface KasTransaksi {
  id: string
  jenis: "pemasukan" | "pengeluaran"
  kategori: string
  jumlah: number
  saldo: number
  deskripsi: string
  tanggal: string
  dicatatOleh: string
  anggotaId?: string
}

export interface Tagihan {
  id: string
  anggotaId: string
  kegiatanId?: string
  jenis: "denda_alpha" | "iuran_anggota" | "denda_pinjaman"
  jumlah: number
  status: "belum_dibayar" | "lunas"
  createdAt: string
  lunasAt?: string
}

export interface PinjamanProgram {
  id: string
  nama: string
  tanggalBuka: string
  tenor: number
  bungaPerUnit: number
  denda: number
  status: "aktif" | "ditutup"
  tanggalTutup?: string
}

export interface Pinjaman {
  id: string
  programId: string
  anggotaId: string
  jumlahPinjaman: number
  sisaPinjaman: number
  unit: number
}

export interface AngsuranPinjaman {
  id: string
  pinjamanId: string
  programId: string
  anggotaId: string
  jenis: "bunga" | "pokok"
  jumlah: number
  bulan?: number
  tanggal: string
  status: "lunas" | "terlambat"
}

export interface Post {
  id: string
  judul: string
  slug: string
  konten: string
  excerpt: string
  coverImage: string
  kategori: "artikel" | "berita" | "pengumuman"
  tags: string[]
  status: "draft" | "published"
  penulisId: string
  createdAt: string
  updatedAt: string
}

export interface Setting {
  key: string
  value: number
}

export interface PageMeta {
  current: number
  total: number
  perPage: number
}
