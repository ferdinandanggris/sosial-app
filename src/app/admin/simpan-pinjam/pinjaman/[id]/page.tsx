"use client"

import { useState, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/admin/PageHeader"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { HandCoins, Users, TrendingUp, Coins, Lock, Unlock, Ban, User, XCircle } from "lucide-react"
import { mockPinjamanProgram, mockPinjaman, mockAngsuran, mockUsers, mockKasTransaksi, recalculateSaldo } from "@/lib/mock-data"
import type { AngsuranPinjaman, PinjamanProgram } from "@/types"

type UnitEntry = {
  key: string
  pinjamanId: string
  anggotaId: string
  unitIndex: number
  jumlahPerUnit: number
  sisaPerUnit: number
}

export default function AdminPinjamanDetailPage() {
  const params = useParams()
  const [modalAnggota, setModalAnggota] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [localAngsuran, setLocalAngsuran] = useState(mockAngsuran)
  const [localPinjaman, setLocalPinjaman] = useState(mockPinjaman)
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0])
  const [status, setStatus] = useState<"lunas" | "terlambat">("lunas")
  const [selected, setSelected] = useState<Record<string, { bunga: number[]; pokok: boolean }>>({})
  const [toggling, setToggling] = useState(false)
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)

  const [program, setProgram] = useState<PinjamanProgram | undefined>(
    () => mockPinjamanProgram.find((p) => p.id === params.id),
  )
  if (!program) return <p className="p-6 text-gray-500">Program tidak ditemukan</p>

  const pinjamanList = useMemo(
    () => localPinjaman.filter((p) => p.programId === program.id),
    [localPinjaman, program.id],
  )

  const totalUnit = pinjamanList.reduce((a, b) => a + b.unit, 0)
  const totalPinjaman = pinjamanList.reduce((a, b) => a + b.jumlahPinjaman, 0)
  const totalSisa = pinjamanList.reduce((a, b) => a + b.sisaPinjaman, 0)
  const totalAnggota = pinjamanList.length

  const getAnggotaAngsuran = useCallback(
    (pinjamanId: string) => localAngsuran.filter((a) => a.pinjamanId === pinjamanId),
    [localAngsuran],
  )

  const getBungaTerbayar = useCallback(
    (pinjamanId: string) => getAnggotaAngsuran(pinjamanId).filter((a) => a.jenis === "bunga").length,
    [getAnggotaAngsuran],
  )

  const getPaidBunga = useCallback(
    (entryKey: string): Set<number> => {
      const set = new Set<number>()
      for (const a of localAngsuran) {
        if (a.jenis === "bunga" && a.bulan && a.id.includes(`-${entryKey}-b`))
          set.add(a.bulan)
      }
      return set
    },
    [localAngsuran],
  )

  const getUnitEntries = useCallback(
    (pinjamanId: string): UnitEntry[] => {
      const p = pinjamanList.find((pi) => pi.id === pinjamanId)
      if (!p) return []
      return Array.from({ length: p.unit }, (_, i) => ({
        key: `${pinjamanId}-u${i}`,
        pinjamanId,
        anggotaId: p.anggotaId,
        unitIndex: i,
        jumlahPerUnit: p.jumlahPinjaman / p.unit,
        sisaPerUnit: p.sisaPinjaman / p.unit,
      }))
    },
    [pinjamanList],
  )

  const openModal = (pinjamanId: string) => {
    setModalAnggota(pinjamanId)
    setSelected({})
    setTanggal(new Date().toISOString().split("T")[0])
    setStatus("lunas")
  }

  const modalEntries = modalAnggota ? getUnitEntries(modalAnggota) : []
  const modalP = pinjamanList.find((pi) => pi.id === modalAnggota)
  const modalNama = modalP ? mockUsers.find((u) => u.id === modalP.anggotaId)?.nama || "—" : ""

  const toggleBunga = (key: string, bulan: number) => {
    setSelected((prev) => {
      const cur = prev[key] || { bunga: [], pokok: false }
      const exists = cur.bunga.includes(bulan)
      return {
        ...prev,
        [key]: { ...cur, bunga: exists ? cur.bunga.filter((b) => b !== bulan) : [...cur.bunga, bulan].sort() },
      }
    })
  }

  const togglePokok = (key: string) => {
    setSelected((prev) => {
      const cur = prev[key] || { bunga: [], pokok: false }
      return { ...prev, [key]: { ...cur, pokok: !cur.pokok } }
    })
  }

  const toggleAllBulan = (bulan: number) => {
    const unpaid = modalEntries.filter((e) => !getPaidBunga(e.key).has(bulan))
    const allChecked = unpaid.length > 0 && unpaid.every((e) => selected[e.key]?.bunga.includes(bulan))
    if (unpaid.length === 0) return
    setSelected((prev) => {
      const next = { ...prev }
      for (const entry of unpaid) {
        const cur = next[entry.key] || { bunga: [], pokok: false }
        next[entry.key] = {
          ...cur,
          bunga: allChecked ? cur.bunga.filter((b) => b !== bulan) : [...cur.bunga, bulan].sort(),
        }
      }
      return next
    })
  }

  const toggleAllPokok = () => {
    const withSisa = modalEntries.filter((e) => e.sisaPerUnit > 0)
    const allChecked = withSisa.length > 0 && withSisa.every((e) => selected[e.key]?.pokok)
    if (withSisa.length === 0) return
    setSelected((prev) => {
      const next = { ...prev }
      for (const entry of withSisa) {
        const cur = next[entry.key] || { bunga: [], pokok: false }
        next[entry.key] = { ...cur, pokok: !allChecked }
      }
      return next
    })
  }

  const tagihanModal = useMemo(() => {
    let bunga = 0, pokok = 0
    const uniqBulan = new Set<number>()
    for (const e of modalEntries) {
      const sel = selected[e.key]
      if (!sel) continue
      bunga += sel.bunga.length * program.bungaPerUnit
      pokok += sel.pokok ? e.sisaPerUnit : 0
      sel.bunga.forEach((b) => uniqBulan.add(b))
    }
    const denda = status === "terlambat" ? uniqBulan.size * 5000 : 0
    return { bunga, pokok, denda, total: bunga + pokok + denda }
  }, [modalEntries, selected, program.bungaPerUnit, status])

  const handleBayar = () => {
    if (!modalP || modalEntries.length === 0) return

    setLoading(true)
    setTimeout(() => {
      const baru: AngsuranPinjaman[] = []
      const uniqBulan = new Set<number>()
      let totalPokok = 0

      for (const entry of modalEntries) {
        const sel = selected[entry.key]
        if (!sel || (sel.bunga.length === 0 && !sel.pokok)) continue

        for (const bulan of sel.bunga) {
          const exists = localAngsuran.some(
            (a) => a.jenis === "bunga" && a.pinjamanId === entry.pinjamanId && a.bulan === bulan && a.id.includes(`-${entry.key}-b`),
          )
          if (exists) continue
          baru.push({
            id: `ang-${Date.now()}-${entry.key}-b${bulan}`,
            pinjamanId: entry.pinjamanId,
            programId: program.id,
            anggotaId: entry.anggotaId,
            jenis: "bunga",
            jumlah: program.bungaPerUnit,
            bulan,
            tanggal,
            status,
          })
          uniqBulan.add(bulan)
        }

        if (sel.pokok && entry.sisaPerUnit > 0) {
          baru.push({
            id: `ang-${Date.now()}-${entry.key}-pokok`,
            pinjamanId: entry.pinjamanId,
            programId: program.id,
            anggotaId: entry.anggotaId,
            jenis: "pokok",
            jumlah: entry.sisaPerUnit,
            tanggal,
            status,
          })
          totalPokok += entry.sisaPerUnit
        }
      }

      if (baru.length === 0) { setLoading(false); return }

      modalP.sisaPinjaman -= totalPokok

      setLocalAngsuran((prev) => [...prev, ...baru])
      mockAngsuran.push(...baru)
      setLocalPinjaman((prev) => prev.map((pi) => (pi.id === modalP.id ? { ...pi, sisaPinjaman: modalP.sisaPinjaman } : pi)))

      const totalAmount = baru.reduce((a, b) => a + b.jumlah, 0)
      const denda = status === "terlambat" ? uniqBulan.size * 5000 : 0
      const namaTxt = mockUsers.find((u) => u.id === modalP.anggotaId)?.nama || "—"
      let desc = `Pembayaran "${program.nama}" - ${namaTxt}`
      if (denda > 0) desc += ` (denda Rp${denda.toLocaleString("id-ID")})`

      mockKasTransaksi.push({
        id: `k-auto-${Date.now()}`,
        jenis: "pemasukan",
        kategori: "lainnya",
        jumlah: totalAmount + denda,
        saldo: 0,
        deskripsi: desc,
        tanggal,
        dicatatOleh: "4",
        anggotaId: modalP.anggotaId,
      })
      recalculateSaldo(mockKasTransaksi)

      setSelected({})
      setModalAnggota(null)
      setLoading(false)
    }, 500)
  }

  const handleToggleProgram = () => {
    setToggling(true)
    setTimeout(() => {
      const isActive = program.status === "aktif"
      const updated: PinjamanProgram = {
        ...program,
        status: isActive ? "ditutup" : "aktif",
        tanggalTutup: isActive ? new Date().toISOString().split("T")[0] : undefined,
      }
      setProgram(updated)
      const idx = mockPinjamanProgram.findIndex((p) => p.id === program.id)
      if (idx >= 0) mockPinjamanProgram[idx] = updated
      setToggling(false)
    }, 300)
  }

  const handleBatalBayar = () => {
    if (!cancelTarget) return
    setCancelling(true)
    setTimeout(() => {
      const target = localAngsuran.find((a) => a.id === cancelTarget)
      if (!target) { setCancelling(false); setCancelTarget(null); return }

      if (target.jenis === "pokok") {
        const pinjaman = localPinjaman.find((p) => p.id === target.pinjamanId)
        if (pinjaman) {
          pinjaman.sisaPinjaman += target.jumlah
          setLocalPinjaman((prev) => prev.map((p) => (p.id === pinjaman.id ? { ...p, sisaPinjaman: pinjaman.sisaPinjaman } : p)))
        }
      }

      setLocalAngsuran((prev) => prev.filter((a) => a.id !== cancelTarget))
      const idx = mockAngsuran.findIndex((a) => a.id === cancelTarget)
      if (idx >= 0) mockAngsuran.splice(idx, 1)

      recalculateSaldo(mockKasTransaksi)
      setCancelling(false)
      setCancelTarget(null)
    }, 300)
  }

  const semuaAngsuran = localAngsuran.filter((a) => a.programId === program.id)

  return (
    <div className="space-y-6">
      <PageHeader title={program.nama} description="Detail program pinjaman" />

      <div className="flex flex-col gap-3">
        <Card><CardContent className="relative grid grid-cols-2 gap-4 p-4">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Users className="h-5 w-5" /></div>
            <div><p className="text-lg font-bold text-gray-900">{totalAnggota}</p><p className="text-xs text-gray-500">Anggota</p></div>
          </div>
          <div className="relative flex items-center justify-center gap-3 before:absolute before:-left-2 before:top-1/2 before:h-8 before:w-px before:-translate-y-1/2 before:bg-gray-200">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600"><HandCoins className="h-5 w-5" /></div>
            <div><p className="text-lg font-bold text-gray-900">{totalUnit}</p><p className="text-xs text-gray-500">Unit</p></div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600"><TrendingUp className="h-5 w-5" /></div>
          <div><p className="text-lg font-bold text-gray-900">Rp{totalPinjaman.toLocaleString("id-ID")}</p><p className="text-xs text-gray-500">Total Pinjaman</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"><Coins className="h-5 w-5" /></div>
          <div><p className="text-lg font-bold text-gray-900">Rp{totalSisa.toLocaleString("id-ID")}</p><p className="text-xs text-gray-500">Sisa Pokok</p></div>
        </CardContent></Card>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 p-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={program.status === "aktif" ? "success" : "default"}>
            {program.status === "aktif" ? "Aktif" : "Ditutup"}
          </Badge>
          <span className="text-gray-500">Tenor: <strong>{program.tenor} bln</strong></span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">Bunga: <strong>Rp{program.bungaPerUnit.toLocaleString("id-ID")}</strong>/unit/bln</span>
          {program.tanggalTutup && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400">Ditutup {new Date(program.tanggalTutup).toLocaleDateString("id-ID")}</span>
            </>
          )}
        </div>
        <Button
          onClick={handleToggleProgram}
          loading={toggling}
          variant={program.status === "aktif" ? "danger" : "secondary"}
          className="gap-1.5"
        >
          {program.status === "aktif" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          {program.status === "aktif" ? "Tutup Pinjaman" : "Buka Pinjaman"}
        </Button>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Anggota</h2>
        <div className="flex flex-col gap-3">
          {pinjamanList.map((p) => {
            const nama = mockUsers.find((u) => u.id === p.anggotaId)?.nama || "—"
            const bungaBayar = getBungaTerbayar(p.id)
            return (
              <div key={p.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 shrink-0">
                      {nama.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{nama}</p>
                      <p className="text-xs text-gray-500">{p.unit} unit &middot; Rp{p.jumlahPinjaman.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  {program.status === "aktif" ? (
                    <Button size="sm" onClick={() => openModal(p.id)}>Bayar</Button>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span>Sisa: <span className="font-medium text-gray-900">Rp{p.sisaPinjaman.toLocaleString("id-ID")}</span></span>
                  <span>Bunga: <span className="font-medium text-gray-900">{bungaBayar}/{program.tenor} bln</span></span>
                </div>
              </div>
            )
          })}
          {pinjamanList.length === 0 && (
            <p className="text-sm text-gray-500">Belum ada anggota</p>
          )}
        </div>
      </div>

      {program.status === "ditutup" && (
        <Card>
          <CardContent className="flex items-center gap-3 p-5 text-sm text-gray-500">
            <Ban className="h-5 w-5 text-gray-400" />
            Program sudah ditutup. Tidak dapat melakukan pembayaran baru.
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat Angsuran</h2>
        {semuaAngsuran.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada angsuran</p>
        ) : (() => {
          const grouped: Record<string, AngsuranPinjaman[]> = {}
          for (const a of semuaAngsuran) {
            if (!grouped[a.anggotaId]) grouped[a.anggotaId] = []
            grouped[a.anggotaId].push(a)
          }
          return (
            <div className="space-y-4">
              {Object.entries(grouped).map(([anggotaId, list]) => {
                const nama = mockUsers.find((u) => u.id === anggotaId)?.nama || "—"
                return (
                  <div key={anggotaId} className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">{nama}</h3>
                    <div className="flex flex-col gap-2">
                      {list.map((a) => (
                        <div key={a.id} className="rounded-md bg-gray-50 px-4 py-2.5">
                          <p className="text-[11px] text-gray-400">
                            {new Date(a.tanggal).toLocaleDateString("id-ID")}
                            {a.bulan ? <>&nbsp;&middot; Bulan ke-{a.bulan}</> : " · Pokok"}
                          </p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Badge variant={a.jenis === "bunga" ? "warning" : "info"}>{a.jenis}</Badge>
                              <Badge variant={a.status === "lunas" ? "success" : "danger"}>{a.status}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">Rp{a.jumlah.toLocaleString("id-ID")}</span>
                              <button
                                onClick={() => setCancelTarget(a.id)}
                                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                title="Batalkan pembayaran"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })()}
      </div>

      <Dialog open={modalAnggota !== null} onOpenChange={(o) => { if (!o) { setModalAnggota(null); setSelected({}) } }}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Pembayaran - {modalNama}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Input label="Tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-44" />
              <fieldset>
                <legend className="mb-1 text-sm font-medium text-gray-700">Status</legend>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-sm">
                    <input type="radio" name="status" value="lunas" checked={status === "lunas"} onChange={() => setStatus("lunas")} className="text-blue-600" />
                    Lunas
                  </label>
                  <label className="flex items-center gap-1.5 text-sm">
                    <input type="radio" name="status" value="terlambat" checked={status === "terlambat"} onChange={() => setStatus("terlambat")} className="text-red-600" />
                    Terlambat
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
              <p className="mb-1.5 text-xs font-medium text-gray-500">Centang semua:</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: program.tenor }, (_, i) => i + 1).map((bln) => {
                  const unpaid = modalEntries.filter((e) => !getPaidBunga(e.key).has(bln))
                  if (unpaid.length === 0) {
                    return (
                      <span key={bln} className="flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-600">
                        ✓ {bln}
                      </span>
                    )
                  }
                  const allChk = unpaid.every((e) => selected[e.key]?.bunga.includes(bln))
                  return (
                    <label
                      key={bln}
                      className={`flex cursor-pointer items-center gap-1 rounded-md border px-2.5 py-1 text-xs transition-colors ${
                        allChk
                          ? "border-blue-300 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <input type="checkbox" checked={allChk} onChange={() => toggleAllBulan(bln)} className="sr-only" />
                      {bln}
                    </label>
                  )
                })}
                <span className="mx-1 text-gray-300">|</span>
                {(() => {
                  const withSisa = modalEntries.filter((e) => e.sisaPerUnit > 0)
                  if (withSisa.length === 0) return <span className="text-xs text-green-600">✓ Pokok lunas</span>
                  const allChk = withSisa.every((e) => selected[e.key]?.pokok)
                  return (
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1 text-xs transition-colors hover:border-gray-300">
                      <input type="checkbox" checked={allChk} onChange={toggleAllPokok} className="h-3.5 w-3.5 text-blue-600" />
                      Pokok ALL
                    </label>
                  )
                })()}
              </div>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto">
              {modalEntries.map((entry) => {
                const paidSet = getPaidBunga(entry.key)
                const sel = selected[entry.key]
                return (
                  <div key={entry.key} className="rounded-lg border border-gray-200 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Rp{entry.jumlahPerUnit.toLocaleString("id-ID")}
                        <span className="ml-1 font-normal text-gray-500">(sisa: Rp{entry.sisaPerUnit.toLocaleString("id-ID")})</span>
                      </span>
                      <Badge variant="warning">Rp{program.bungaPerUnit}/bln</Badge>
                    </div>

                    <div className="mb-2">
                      <p className="mb-1 text-xs font-medium text-gray-500">Bunga:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: program.tenor }, (_, i) => i + 1).map((bln) => {
                          const paid = paidSet.has(bln)
                          const checked = sel?.bunga.includes(bln) || false
                          return (
                            <label
                              key={bln}
                              className={`flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ${
                                paid ? "border-green-200 bg-green-50 text-green-600" : checked ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              <input type="checkbox" checked={paid || checked} disabled={paid} onChange={() => toggleBunga(entry.key, bln)} className="sr-only" />
                              {paid ? "✓ " : ""}{bln}
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      {entry.sisaPerUnit > 0 ? (
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:border-gray-300">
                          <input type="checkbox" checked={sel?.pokok || false} onChange={() => togglePokok(entry.key)} className="h-4 w-4 text-blue-600" />
                          Pokok Rp{entry.sisaPerUnit.toLocaleString("id-ID")}
                        </label>
                      ) : (
                        <Badge variant="success" className="text-xs">Lunas</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {tagihanModal.total > 0 && (
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                {tagihanModal.bunga > 0 && <p className="text-gray-600">Bunga: <span className="font-medium">Rp{tagihanModal.bunga.toLocaleString("id-ID")}</span></p>}
                {tagihanModal.pokok > 0 && <p className="text-gray-600">Pokok: <span className="font-medium">Rp{tagihanModal.pokok.toLocaleString("id-ID")}</span></p>}
                {tagihanModal.denda > 0 && <p className="text-gray-600">Denda: <span className="font-medium text-red-600">Rp{tagihanModal.denda.toLocaleString("id-ID")}</span></p>}
                <p className="pt-1 font-semibold text-gray-900">Total dibayar: Rp{tagihanModal.total.toLocaleString("id-ID")}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => { setModalAnggota(null); setSelected({}) }} disabled={loading}>Batal</Button>
              <Button onClick={handleBayar} loading={loading} disabled={tagihanModal.total <= 0}>Proses Pembayaran</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={cancelTarget !== null}
        onOpenChange={(o) => { if (!o) setCancelTarget(null) }}
        title="Batalkan Pembayaran"
        description="Apakah kamu yakin ingin membatalkan pembayaran ini? Data angsuran akan dihapus dan sisa pokok akan dikembalikan."
        confirmLabel="Ya, Batalkan"
        onConfirm={handleBatalBayar}
        loading={cancelling}
      />
    </div>
  )
}
