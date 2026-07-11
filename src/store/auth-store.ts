"use client"

import { create } from "zustand"
import type { AuthState, User } from "@/types"
import { mockUsers } from "@/lib/mock-data"

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("karangtaruna_user")
  return stored ? JSON.parse(stored) : null
}

function setStoredUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("karangtaruna_user", JSON.stringify(user))
  } else {
    localStorage.removeItem("karangtaruna_user")
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser(),

  login: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))
    const found = mockUsers.find((u) => u.email === email)
    if (!found || password !== "password") {
      throw new Error("Email atau password salah")
    }
    if (found.status === "nonaktif") {
      throw new Error("Akun Anda tidak aktif")
    }
    setStoredUser(found)
    set({ user: found, isAuthenticated: true })
  },

  logout: () => {
    setStoredUser(null)
    set({ user: null, isAuthenticated: false })
  },

  updateProfile: (data: Partial<User>) => {
    set((state) => {
      if (!state.user) return state
      const updated = { ...state.user, ...data }
      setStoredUser(updated)
      return { user: updated }
    })
  },
}))
