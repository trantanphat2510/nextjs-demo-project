import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GlobalState {
  theme: "light" | "dark"
  language: string
  currency: string
  notifications: boolean

  // UI State
  sidebarOpen: boolean
  loading: boolean

  // Actions
  setTheme: (theme: "light" | "dark") => void
  setLanguage: (language: string) => void
  setCurrency: (currency: string) => void
  toggleNotifications: () => void
  toggleSidebar: () => void
  setLoading: (loading: boolean) => void
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      theme: "light",
      language: "en",
      currency: "USD",
      notifications: true,
      sidebarOpen: false,
      loading: false,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "global-settings",
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        currency: state.currency,
        notifications: state.notifications,
      }),
    },
  ),
)
