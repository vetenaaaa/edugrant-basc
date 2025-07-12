import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {}

type UserState = {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store'
    }
  )
)
