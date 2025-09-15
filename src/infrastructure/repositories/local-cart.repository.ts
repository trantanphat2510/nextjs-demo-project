import type { Cart, CartItem } from "../../domain/entities/product.entity"
import type { CartRepository } from "../../domain/repositories/cart.repository"

export class LocalCartRepository implements CartRepository {
  private readonly CART_KEY = "ecommerce-cart"

  async getCart(): Promise<Cart> {
    if (typeof window === "undefined") {
      return { items: [], total: 0, itemCount: 0 }
    }

    const stored = localStorage.getItem(this.CART_KEY)
    const items: CartItem[] = stored ? JSON.parse(stored) : []

    return this.calculateCart(items)
  }

  async addItem(item: CartItem): Promise<void> {
    const cart = await this.getCart()
    const existingIndex = cart.items.findIndex((i) => i.product.id === item.product.id)

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += item.quantity
    } else {
      cart.items.push(item)
    }

    this.saveCart(cart.items)
  }

  async removeItem(productId: string): Promise<void> {
    const cart = await this.getCart()
    const filtered = cart.items.filter((item) => item.product.id !== productId)
    this.saveCart(filtered)
  }

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    const cart = await this.getCart()
    const item = cart.items.find((i) => i.product.id === productId)

    if (item) {
      item.quantity = quantity
      this.saveCart(cart.items)
    }
  }

  async clearCart(): Promise<void> {
    this.saveCart([])
  }

  private saveCart(items: CartItem[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.CART_KEY, JSON.stringify(items))
    }
  }

  private calculateCart(items: CartItem[]): Cart {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return { items, total, itemCount }
  }
}
