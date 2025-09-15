"use client"

import { useEffect } from "react"
import { useAuthStore } from "../stores/auth.store"
import { useCartStore } from "../stores/cart.store"


export const useStoreSync = () => {
  const user = useAuthStore((state) => state.user)
  const loadCart = useCartStore((state) => state.loadCart)

  // Sync cart with user authentication state
  useEffect(() => {
    if (user) {
      // User logged in - reload cart to sync with user's cart
      loadCart()
    } else {
      // User logged out - optionally clear cart or keep local cart
      // For demo purposes, we'll keep the local cart
      // clearCart();
    }
  }, [user, loadCart])

  return {
    isAuthenticated: !!user,
    user,
  }
}
