"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useAuthStore } from "../stores/auth.store"
import { useCartStore } from "../stores/cart.store"
import { useProductStore } from "../stores/product.store"
import { useGlobalStore } from "../stores/global.store"

interface StoreContextType {
  auth: typeof useAuthStore
  cart: typeof useCartStore
  products: typeof useProductStore
  global: typeof useGlobalStore
}

const StoreContext = createContext<StoreContextType | null>(null)

export const useStores = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStores must be used within a StoreProvider")
  }
  return context
}

interface StoreProviderProps {
  children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const stores = {
    auth: useAuthStore,
    cart: useCartStore,
    products: useProductStore,
    global: useGlobalStore,
  }

  // Initialize stores on mount
  useEffect(() => {
    const initializeStores = async () => {
      try {
        // Check authentication status
        await useAuthStore.getState().checkAuth()

        // Load cart data
        await useCartStore.getState().loadCart()

        // Load products
        await useProductStore.getState().loadProducts()
      } catch (error) {
        console.error("Failed to initialize stores:", error)
      }
    }

    initializeStores()
  }, [])

  return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
}
