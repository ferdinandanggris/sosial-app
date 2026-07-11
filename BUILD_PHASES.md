# Karang Taruna Super App — Build Phases

## Phase 0: Project Scaffolding

**Goal**: Initialize Next.js project + dependencies + folder structure

### Tasks
- [ ] `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir`
- [ ] Install dependencies:
  - `lucide-react` (icons)
  - `zustand` (state management)
  - `clsx` + `tailwind-merge` (class utilities)
  - `@radix-ui/react-dialog` (modal)
  - `@radix-ui/react-tabs` (tabs)
  - `@radix-ui/react-select` (select)
  - `@radix-ui/react-avatar` (avatar)
- [ ] Setup `lib/utils.ts` (cn() helper)
- [ ] Setup `lib/mock-data.ts` (all dummy data)
- [ ] Setup `types/index.ts` (all TypeScript interfaces)
- [ ] Setup `store/auth-store.ts` (Zustand auth store)
- [ ] Setup folder structure:
  ```
  src/
  ├── app/
  │   ├── (public)/
  │   ├── (auth)/
  │   ├── (dashboard)/
  │   └── admin/
  ├── components/
  │   ├── ui/
  │   ├── landing/
  │   ├── kegiatan/
  │   ├── galeri/
  │   ├── dashboard/
  │   ├── admin/
  │   └── auth/
  ├── lib/
  ├── store/
  └── types/
  ```

---

## Phase 1: UI Primitives

**Goal**: Build reusable base components (shadcn-style)

### Components
- [ ] `Button.tsx` — variant (primary|secondary|ghost|danger), size (sm|md|lg), loading state
- [ ] `Input.tsx` — label, error message, icon slot
- [ ] `Textarea.tsx` — label, error, rows
- [ ] `Card.tsx` — Card, CardHeader, CardContent, CardFooter
- [ ] `Badge.tsx` — variant (default|success|warning|danger|info)
- [ ] `Dialog.tsx` — modal with overlay, close, animation
- [ ] `Select.tsx` — label, options, placeholder
- [ ] `Tabs.tsx` — TabsList, TabsTrigger, TabsContent
- [ ] `Avatar.tsx` — image fallback to initials, size
- [ ] `Skeleton.tsx` — SkeletonCard, SkeletonTable, SkeletonLine
- [ ] `EmptyState.tsx` — icon + message + optional action button
- [ ] `ErrorState.tsx` — icon + message + "Coba Lagi" button
- [ ] `Pagination.tsx` — prev, page numbers, next
- [ ] `BottomNav.tsx` — floating bottom nav (mobile, `lg:hidden`)
- [ ] `MobileDrawer.tsx` — slide drawer from left (hamburger menu)

---

## Phase 2: Public Layout

**Goal**: Landing page layout + responsive navigation

### Components
- [ ] `PublicLayout.tsx` — wraps (public) group
- [ ] `Header.tsx`
  - Desktop: Logo + Nav + CTA
  - Mobile: Logo + Hamburger → MobileDrawer
- [ ] `Footer.tsx`
  - Desktop: 4 columns (logo+desc, quick links, sosial media, kontak)
  - Mobile: Stacked single column
- [ ] `BottomNav.tsx` — floating tab bar (Beranda, Kegiatan, Galeri, Kontak)

### Pages
- [ ] `/(public)/page.tsx` — Landing page shell
- [ ] `/(public)/layout.tsx` — PublicLayout wrapper

---

## Phase 3: Landing Page Sections

**Goal**: Build all landing page sections

### Components
- [ ] `HeroSection.tsx` — judul, subjudul, ilustrasi, CTA button
- [ ] `StatistikSection.tsx` — 4x StatCard (responsive: 4→2 cols)
- [ ] `KegiatanPreviewSection.tsx` — SectionHeader + 3 KegiatanCard
- [ ] `VisiMisiSection.tsx` — Visi (left) + Misi list (right)
- [ ] `GaleriPreviewSection.tsx` — SectionHeader + 4 GaleriCard
- [ ] `CtaSection.tsx` — "Siap Bergabung?" + Daftar button

### Pages (fill with sections)
- [ ] `/(public)/page.tsx` — compose all landing sections
- [ ] `/(public)/tentang/page.tsx` — Sejarah + VisiMisi + Pengurus
- [ ] `/(public)/kontak/page.tsx` — Info + Sosmed + Form

---

## Phase 4: Kegiatan & Galeri Public Pages

**Goal**: Full kegiatan and galeri browsing experience

### Components
- [ ] `KegiatanCard.tsx` — thumbnail, judul, tanggal, kategori badge
- [ ] `KegiatanGrid.tsx` — grid wrapper + loading/empty/error
- [ ] `FilterBar.tsx` — kategori chips + search input + sort
- [ ] `GaleriCard.tsx` — image thumbnail, caption overlay
- [ ] `GaleriGrid.tsx` — masonry grid + loading/empty/error
- [ ] `LightboxModal.tsx` — full screen image viewer
- [ ] `PageBanner.tsx` — reusable page header banner

### Pages
- [ ] `/(public)/kegiatan/page.tsx` — FilterBar + KegiatanGrid + Pagination
- [ ] `/(public)/kegiatan/[slug]/page.tsx` — Detail kegiatan (header, content, share, related)
- [ ] `/(public)/galeri/page.tsx` — GaleriGrid + LightboxModal

---

## Phase 5: Auth Flow

**Goal**: Login & Register pages

### Components
- [ ] `AuthLayout.tsx` — centered layout, no nav
- [ ] `AuthCard.tsx` — card wrapper with logo
- [ ] `AuthForm.tsx` — email, password, submit (shared for login/register)

### Store
- [ ] `auth-store.ts` — login, logout, updateProfile, persist to localStorage

### Pages
- [ ] `/(auth)/login/page.tsx`
- [ ] `/(auth)/register/page.tsx`

---

## Phase 6: Member Dashboard

**Goal**: Member area after login

### Components
- [ ] `DashboardLayout.tsx`
  - Desktop: Sidebar + Header + Content
  - Mobile: Header + Content + BottomNav (Dashboard, Kegiatan, Profil)
- [ ] `DashboardHeader.tsx` — greeting, avatar, notif bell
- [ ] `Sidebar.tsx` — nav links, user info, logout
  - Desktop: fixed left
  - Mobile: hidden → MobileDrawer
- [ ] `WelcomeCard.tsx` — personal stats
- [ ] `StatCard.tsx` — icon + value + label
- [ ] `KegiatanSayaCard.tsx` — kegiatan card for member list

### Pages
- [ ] `/(dashboard)/dashboard/page.tsx` — WelcomeCard + Kegiatan + Aktivitas
- [ ] `/(dashboard)/dashboard/profil/page.tsx` — ProfilForm + AvatarUpload
- [ ] `/(dashboard)/dashboard/kegiatan/page.tsx` — Tabs + List Kegiatan Saya
- [ ] `/(dashboard)/layout.tsx` — DashboardLayout wrapper

---

## Phase 7: Admin Layout & Dashboard

**Goal**: Admin panel foundation

### Components
- [ ] `AdminLayout.tsx`
  - Desktop: AdminSidebar + AdminHeader + Content
  - Mobile: AdminHeader + Content + BottomNav
- [ ] `AdminSidebar.tsx` — icon + label nav, collapsible
- [ ] `AdminHeader.tsx` — search, notif bell, avatar dropdown
- [ ] `PageHeader.tsx` — title + action button slot
- [ ] `DataTable.tsx` — generic sortable table
- [ ] `ResponsiveTable.tsx` — table desktop, card list mobile
- [ ] `ConfirmDialog.tsx` — "Yakin hapus?" confirmation

### Pages
- [ ] `/admin/page.tsx` — StatCards + latest kegiatan + latest anggota
- [ ] `/admin/layout.tsx` — AdminLayout wrapper

---

## Phase 8: Admin CRUD — Kegiatan & Anggota

**Goal**: Full CRUD for kegiatan and anggota management

### Components
- [ ] `KegiatanForm.tsx` — form fields for kegiatan (dialog)
- [ ] `AnggotaForm.tsx` — form fields for anggota (dialog)

### Pages
- [ ] `/admin/kegiatan/page.tsx` — DataTable + KegiatanModal + Pagination
- [ ] `/admin/anggota/page.tsx` — DataTable + AnggotaModal + Pagination

---

## Phase 9: Admin Galeri & Konten Landing

**Goal**: Manage gallery and landing page content

### Components
- [ ] `GaleriForm.tsx` — upload preview + caption + kategori

### Pages
- [ ] `/admin/galeri/page.tsx` — GaleriGrid + GaleriModal
- [ ] `/admin/konten/page.tsx` — Tabs: Hero, VisiMisi, Statistik, Kontak
  - HeroForm, VisiMisiForm, StatistikForm, KontakForm

---

## Phase 10: Polish & Finalization

**Goal**: Responsive testing, accessibility, animations

### Tasks
- [ ] Test all pages at 320px, 768px, 1024px, 1440px
- [ ] Add page transitions (framer-motion or CSS transitions)
- [ ] Add focus-visible styles for keyboard navigation
- [ ] Add aria-labels to all interactive elements
- [ ] Test BottomNav active state + routing
- [ ] Ensure all loading/empty/error states work
- [ ] Performance: lazy load images, code-split admin pages
- [ ] Final responsive pass: no horizontal scroll, proper touch targets (≥44px)

---

## Phase 11: Role System Expansion

**Goal**: Expand role system from (admin|member) to (admin|bendahara|sekretaris|member)

### Data Types
- [ ] Update `User.role` → `'admin' | 'bendahara' | 'sekretaris' | 'member'`
- [ ] Update `mockUsers` — add 1 user per role (bendahara, sekretaris)
- [ ] Add mock credentials for each role

### Components
- [ ] `AdminSidebar.tsx` — refactor to filter nav items by role
  - Admin: Dashboard, Kegiatan, Anggota, Kas, Simpan Pinjam, Absensi, Galeri, Konten
  - Bendahara: Dashboard (kas), Kas, Simpan Pinjam
  - Sekretaris: Dashboard (absensi), Anggota, Absensi
- [ ] `AdminLayout.tsx` — pass role to sidebar
- [ ] Admin guard (`/admin/layout.tsx`) — allow bendahara + sekretaris too, redirect sesuai role

### Auth Store
- [ ] Add mock login for each role (different email/credential per role)

---

## Phase 12: Kas Arisan

**Goal**: Full treasury management for bendahara role

### Data Types
- [x] Add `KasTransaksi` interface with `saldo: number`:
  ```typescript
  interface KasTransaksi {
    id: string
    jenis: 'pemasukan' | 'pengeluaran'
    kategori: string // pemasukan: iuran|donasi|denda|lainnya
    jumlah: number   // pengeluaran: operasional|kegiatan|lainnya
    saldo: number    // running balance, maintained by recalculateSaldo()
    deskripsi: string
    tanggal: string
    dicatatOleh: string
    anggotaId?: string
  }
  ```
- [x] Add `mockKasTransaksi` — 12 transaksi sample with saldo via `recalculateSaldo()`
- [ ] Add `Tagihan` interface:
  ```typescript
  interface Tagihan {
    id: string
    anggotaId: string
    kegiatanId?: string
    jenis: 'denda_alpha' | 'iuran_anggota'
    jumlah: number
    status: 'belum_dibayar' | 'lunas'
    createdAt: string
    lunasAt?: string
  }
  ```
- [x] Add `recalculateSaldo(transactions)` — sort by tanggal, compute running balance, mutate saldo in-place
- [x] Add `mockTagihan` — 3 tagihan sample

### Components
- [x] `KasForm.tsx` — form for add/edit transaksi (jenis, kategori, jumlah, deskripsi, anggota)
- [x] `KasSaldoCard.tsx` — display total saldo (pemasukan - pengeluaran)
- [x] `RingkasanKas.tsx` — pemasukan vs pengeluaran bulan ini

### Pages (Admin - Bendahara)
- [x] `/admin/kas/page.tsx` — dashboard kas
  - Saldo total kartu
  - Ringkasan pemasukan/pengeluaran (2 kartu)
  - 5 transaksi terbaru dengan Sisa Saldo
  - Daftar tagihan outstanding per anggota
- [x] `/admin/kas/transaksi/page.tsx` — full CRUD table
  - DataTable (No, Jenis, Kategori, Jumlah, **Sisa Saldo**, Tanggal, Dicatat Oleh, Aksi)
  - Filter: **date range** (`[Dari] — [Sampai]`), jenis, kategori
  - Pagination
  - Dialog modal for CRUD
  - Sync to `mockKasTransaksi` + `recalculateSaldo()` on every mutation
- [x] `/admin/kas/laporan/page.tsx` — laporan per tanggal
  - Filter **date range** (`[Dari] — [Sampai]`)
  - Ringkasan: total pemasukan, total pengeluaran, saldo
  - Table detail transaksi dengan **Sisa Saldo**
- [x] `/admin/kas/tagihan/page.tsx` — manage tagihan anggota
  - DataTable (Nama, Jenis, Jumlah, Kegiatan, Status, Aksi)
  - Filter: status (belum_dibayar/lunas), anggota
  - **[Detail]** button → modal dengan info lengkap tagihan
  - Bayar button → set status lunas, create KasTransaksi otomatis

### Pages (Member)
- [x] `/dashboard/kas/page.tsx` — member view
  - Tagihan pribadi (list: sudah bayar vs belum)
  - Riwayat pembayaran
  - Total sudah dibayar

---

## Phase 13: Absensi

**Goal**: Attendance management for sekretaris role, auto-generate tagihan for alpha

### Data Types
- [x] Add `dendaAlpha: number` field to `Kegiatan` interface
- [x] Update `mockKegiatan` — add dendaAlpha per kegiatan (varies: 5000-20000)
- [x] Add `Absensi` interface:
  ```typescript
  interface Absensi {
    id: string
    kegiatanId: string
    anggotaId: string
    status: 'hadir' | 'izin' | 'alpha'
    keterangan?: string
  }
  ```
- [x] Add `RekapAbsensi` computed view (not stored):
  ```typescript
  interface RekapAbsensi {
    kegiatanId: string
    total: number
    hadir: number
    izin: number
    alpha: number
  }
  ```
- [x] Add `mockAbsensi` — 8 sample attendance data

### Components
- [x] `AbsensiForm.tsx` — checkbox list per anggota + submit button
  - Load anggota aktif
  - Tampilkan per status: hadir (default), izin, alpha
  - Submit → save absensi + auto-generate Tagihan for alpha

### Pages (Admin - Sekretaris)
- [x] `/admin/absensi/page.tsx` — daftar absensi per kegiatan
  - Table: Kegiatan, Tanggal, Total Hadir, Izin, Alpha, Aksi (isi absen)
  - Filter: date range, kegiatan
- [x] `/admin/absensi/[kegiatanId]/page.tsx` — form absen
  - Tampilkan semua anggota aktif
  - Radio group per anggota: Hadir / Izin / Alpha
  - Jika alpha, tambah keterangan opsional
  - Submit → save + auto-generate Tagihan untuk setiap alpha (jumlah = dendaAlpha)
- [x] `/admin/absensi/laporan/page.tsx` — rekap per tanggal
  - Filter **date range** (`[Dari] — [Sampai]`)
  - Grafik kehadiran (3 bar: Hadir, Izin, Alpha)
  - Table per anggota: total hadir, izin, alpha, total denda

### Pages (Member)
- [x] `/dashboard/absensi/page.tsx` — member view
  - Kehadiran pribadi (histogram sederhana)
  - List absensi per kegiatan (status + tanggal)
  - Total denda alpha yang belum dibayar

### Integration (Auto Tagihan Flow)
```
Sekretaris submit absensi → untuk setiap anggota status="alpha":
  buat Tagihan {
    anggotaId,
    kegiatanId,
    jenis: 'denda_alpha',
    jumlah: kegiatan.dendaAlpha,
    status: 'belum_dibayar'
  }
  tagihan muncul di /admin/kas/tagihan
```

---

## Phase 14: Simpan Pinjam (Program-based)

**Goal**: Program-based loan system — admin opens a program, all members pick units via +/-.

### Data Types
- [x] Add `PinjamanProgram` interface (program-level):
  ```typescript
  interface PinjamanProgram {
    id: string
    nama: string           // "Pinjaman Q1 2025"
    status: 'aktif' | 'ditutup'
    defaultJumlah: number  // per unit (default 100000)
    bungaPerBulan: number  // default 2500 per unit
    denda: number          // default 5000/bulan
    tenor: number          // 6 bulan
    createdAt: string
  }
  ```
- [x] Add `Pinjaman` interface (per anggota, per program):
  ```typescript
  interface Pinjaman {
    id: string
    programId: string
    anggotaId: string
    unit: number           // jumlah unit diambil
    sisaUnit: number       // unit tersisa (pokok belum dibayar)
    createdAt: string
  }
  ```
- [x] Add `AngsuranPinjaman` interface:
  ```typescript
  interface AngsuranPinjaman {
    id: string             // convention: ang-{ts}-{pinjamanId}-u{unitIndex}-b{bulan}
    pinjamanId: string
    programId: string
    anggotaId: string
    jenis: 'bunga' | 'pokok'
    jumlah: number
    denda?: number         // 5000 if telat
    bulan?: number         // bulan ke-berapa (only for bunga)
    tanggal: string
    status: 'lunas' | 'terlambat'
  }
  ```
- [x] Add `Setting` interface:
  ```typescript
  interface Setting {
    key: string
    value: number
  }
  // Default: pinjaman.defaultJumlah=100000, pinjaman.bunga=2500, pinjaman.denda=5000
  ```
- [x] Add `mockPinjamanProgram` — 2 programs (1 aktif, 1 ditutup)
- [x] Add `mockPinjaman` — 5 pinjaman across 2 programs
- [x] Add `mockAngsuran` — 14 angsuran sample
- [x] Add `mockSettings` — default config

### Components
- [x] `PinjamanForm.tsx` — form for create program + anggota pick units via +/- buttons
- [x] `DialogBayarAnggota.tsx` — payment modal per anggota (bunga + pokok per unit row)

### Pages (Admin - Bendahara)
- [x] `/admin/simpan-pinjam/page.tsx` — dashboard
  - Total pinjaman aktif (units)
  - Total angsuran bulan ini
  - Angsuran terlambat (warning)
- [x] `/admin/simpan-pinjam/pinjaman/page.tsx` — daftar program
  - DataTable: No, Nama Program, Status, Total Anggota, Total Unit, Aksi
  - **[Tutup]** / **[Buka]** button toggles program status with confirm dialog
  - Button: Tambah Program (modal)
- [x] `/admin/simpan-pinjam/pinjaman/[id]/page.tsx` — detail program
  - Info program + badge status (Aktif/Ditutup) + toggle **Tutup/Buka** button
  - Table anggota: Nama, Unit, Sisa Unit, [Bayar], [Riwayat]
  - **Payment modal per anggota** (dialog):
    - Per-unit rows with bunga checkboxes (1-6) + pokok checkbox per unit
    - Select-all row: per bulan (centang semua bunga bulan itu) + Pokok ALL
    - Denda Rp5.000/bulan unik otomatis jika ada angsuran terlambat
    - Tanggal manual input + status radio (Lunas/Terlambat)
    - Submit → create AngsuranPinjaman + KasTransaksi (pemasukan) + `recalculateSaldo()`
  - Payment disabled saat program ditutup
- [x] `/admin/simpan-pinjam/settings/page.tsx` — config
  - Edit: default jumlah pinjaman, bunga per bulan, denda keterlambatan

### Pages (Member)
- [x] `/dashboard/simpan-pinjam/page.tsx` — member view
  - Daftar program aktif + unit diambil
  - Riwayat pembayaran bunga & pokok
  - Total pinjaman, total sudah dibayar, sisa
  - Unit picking interface saat program baru dibuka

---

## Phase 15: Dashboard Refresh & Integration

**Goal**: Update dashboards to show interconnected data across all features

### Admin Dashboard (`/admin/page.tsx`)
- [x] Role-based stat cards:
  - Admin: all stats (anggota, kegiatan, kas, pinjaman, absensi)
  - Bendahara: total saldo kas, total tagihan outstanding, total pinjaman aktif
  - Sekretaris: total anggota, absensi bulan ini (hadir/izin/alpha)

### Member Dashboard (`/dashboard/page.tsx`)
- [x] Add new cards:
  - Kas: saldo + tagihan outstanding
  - Simpan pinjam: total pinjaman aktif
  - Absensi: kehadiran bulan ini (hadir/izin/alpha)
- [x] BottomNav: add Kas, Simpan Pinjam, Absensi (role-dependent)
- [x] Sidebar: same — filter by features available

### Integration Points
- [x] Absensi → Tagihan: submit absensi = auto-create tagihan denda
- [x] Tagihan → Kas: bayar tagihan = auto-create pemasukan kas
- [x] Angsuran → Kas: bayar angsuran = auto-create pemasukan kas dengan saldo sync

---

## Phase 16: UI Refinements & Batal Bayar

**Goal**: Layout improvements, saldo visibility, cancel payment feature

### Changes

#### Admin Kas (`/admin/kas/page.tsx`)
- [x] Hapus Pemasukan & Pengeluaran Bulan Ini dari header (pindah ke tab Laporan)
- [x] Header hanya tampilkan **Total Saldo** + **Tagihan Outstanding** (2 card)

#### Member Dashboard Kas (`/dashboard/kas/page.tsx`)
- [x] Tambah **Saldo Kas Saat Ini** card di atas tab (paling atas)

#### Halaman Anggota (`/admin/anggota/page.tsx`)
- [x] Tambah **Saldo Kas Saat Ini** card di bawah PageHeader

#### Main Dashboard (`/dashboard/page.tsx`)
- [x] Tambah **Kegiatan Akan Datang** section (max 3, filter: tanggal >= hari ini)
- [x] Status **"Hari Ini"** untuk kegiatan dengan tanggal == hari ini
- [x] Link "Lihat Semua" menuju `/dashboard/kegiatan`

#### Kegiatan Saya Card (`KegiatanSayaCard.tsx`)
- [x] Tambah varian `"Hari Ini"` dengan badge `info` (biru)

#### Kegiatan Page (`/dashboard/kegiatan/page.tsx`)
- [x] `getStatus()` — tanggal == hari ini → `"Hari Ini"`, masa depan → `"akan datang"`, lewat → `"selesai"`

#### Detail Pinjaman (`/admin/simpan-pinjam/pinjaman/[id]/page.tsx`)
- [x] **Anggota + Unit** digabung 1 card dengan `grid grid-cols-2` + vertical divider
- [x] **Total Pinjaman** dan **Sisa Pokok** masing-masing card sendiri
- [x] Status info bar: ganti dari Card ke `bg-gray-50 rounded-lg`, inline badge + tenor + bunga + tanggal tutup
- [x] Label **"Tutup Pinjaman"** / **"Buka Pinjaman"** (bukan "Program")
- [x] **Batal Bayar** — tombol `XCircle` di setiap baris Riwayat Angsuran
  - Confirm dialog sebelum hapus
  - Hapus angsuran dari `localAngsuran` + `mockAngsuran`
  - Kembalikan `sisaPinjaman` jika batalkan pembayaran pokok
  - Layout riwayat: tanggal + Bulan ke-n di atas, badges di bawah, nominal + cancel di kanan tengah

---

## Summary

| Phase | Name | Pages | Components | Est. Time |
|-------|------|-------|------------|-----------|
| 0 | Project Scaffolding | — | — | 30 min |
| 1 | UI Primitives | — | 16 | 2 jam |
| 2 | Public Layout | 1 | 4 | 1 jam |
| 3 | Landing Sections | 3 | 6 | 2 jam |
| 4 | Kegiatan & Galeri | 3 | 6 | 2 jam |
| 5 | Auth Flow | 2 | 3 | 1 jam |
| 6 | Member Dashboard | 3 | 6 | 2 jam |
| 7 | Admin Layout | 1 | 6 | 1.5 jam |
| 8 | Admin CRUD | 2 | 2 | 2 jam |
| 9 | Admin Galeri & Konten | 2 | 1 | 1.5 jam |
| 10 | Polish | — | — | 2 jam |
| 11 | Role System | — | 2 | 1 jam |
| 12 | Kas Arisan | 5 | 4 | 4 jam |
| 13 | Absensi | 4 | 2 | 3 jam |
| 14 | Simpan Pinjam (Program-based) | 5 | 4 | 5 jam |
| 15 | Dashboard Refresh | 3 | — | 2 jam |
| 16 | UI Refinements & Batal Bayar | 4 | 1 | 2 jam |
| | **Total** | **~38** | **~65** | **~35 jam** |
