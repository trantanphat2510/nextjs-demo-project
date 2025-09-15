import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AuthState } from "../../domain/entities/user.entity"
import type { AuthUseCases } from "../../application/use-cases/auth.use-cases"
import { container } from "../../infrastructure/di/container"

interface AuthStoreState extends AuthState {
  // Actions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => {
      const authUseCases = container.resolve<AuthUseCases>("AuthUseCases")

      return {
        user: null,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })
          try {
            const user = await authUseCases.login(email, password)
            set({ user, isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Login failed",
              isLoading: false,
            })
          }
        },

        register: async (email: string, password: string, name: string) => {
          set({ isLoading: true, error: null })
          try {
            const user = await authUseCases.register(email, password, name)
            set({ user, isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Registration failed",
              isLoading: false,
            })
          }
        },

        logout: async () => {
          set({ isLoading: true, error: null })
          try {
            await authUseCases.logout()
            set({ user: null, isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Logout failed",
              isLoading: false,
            })
          }
        },

        checkAuth: async () => {
          set({ isLoading: true, error: null })
          try {
            const user = await authUseCases.getCurrentUser()
            set({ user, isLoading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Auth check failed",
              isLoading: false,
              user: null,
            })
          }
        },

        clearError: () => {
          set({ error: null })
        },
      }
    },
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
)
