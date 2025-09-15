import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Cart, CartItem } from "../../domain/entities/product.entity"
import type { CartUseCases } from "../../application/use-cases/cart.use-cases"
import { container } from "../../infrastructure/di/container"

interface CartState extends Cart {
  isOpen: boolean
  loading: boolean
  error: string | null

  // Actions
  loadCart: () => Promise<void>
  addItem: (item: CartItem) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => {
      const cartUseCases = container.resolve<CartUseCases>("CartUseCases")

      return {
        items: [],
        total: 0,
        itemCount: 0,
        isOpen: false,
        loading: false,
        error: null,

        loadCart: async () => {
          set({ loading: true, error: null })
          try {
            const cart = await cartUseCases.getCart()
            set({
              items: cart.items,
              total: cart.total,
              itemCount: cart.itemCount,
              loading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to load cart",
              loading: false,
            })
          }
        },

        addItem: async (item: CartItem) => {
          set({ loading: true, error: null })
          try {
            await cartUseCases.addToCart(item)
            const cart = await cartUseCases.getCart()
            set({
              items: cart.items,
              total: cart.total,
              itemCount: cart.itemCount,
              loading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to add item",
              loading: false,
            })
          }
        },

        removeItem: async (productId: string) => {
          set({ loading: true, error: null })
          try {
            await cartUseCases.removeFromCart(productId)
            const cart = await cartUseCases.getCart()
            set({
              items: cart.items,
              total: cart.total,
              itemCount: cart.itemCount,
              loading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to remove item",
              loading: false,
            })
          }
        },

        updateQuantity: async (productId: string, quantity: number) => {
          set({ loading: true, error: null })
          try {
            await cartUseCases.updateQuantity(productId, quantity)
            const cart = await cartUseCases.getCart()
            set({
              items: cart.items,
              total: cart.total,
              itemCount: cart.itemCount,
              loading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to update quantity",
              loading: false,
            })
          }
        },

        clearCart: async () => {
          set({ loading: true, error: null })
          try {
            await cartUseCases.clearCart()
            set({
              items: [],
              total: 0,
              itemCount: 0,
              loading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to clear cart",
              loading: false,
            })
          }
        },

        toggleCart: () => {
          set((state) => ({ isOpen: !state.isOpen }))
        },

        openCart: () => {
          set({ isOpen: true })
        },

        closeCart: () => {
          set({ isOpen: false })
        },
      }
    },
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    },
  ),
)
