import type { Cart, CartItem } from "../entities/product.entity"

export interface CartRepository {
  getCart(): Promise<Cart>
  addItem(item: CartItem): Promise<void>
  removeItem(productId: string): Promise<void>
  updateQuantity(productId: string, quantity: number): Promise<void>
  clearCart(): Promise<void>
}
