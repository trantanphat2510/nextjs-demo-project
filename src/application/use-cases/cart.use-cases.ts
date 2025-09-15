import { Cart, CartItem } from "@/src/domain/entities/product.entity"
import { CartRepository } from "@/src/domain/repositories/cart.repository"


export class CartUseCases {
  constructor(private cartRepository: CartRepository) {}

  async getCart(): Promise<Cart> {
    return await this.cartRepository.getCart()
  }

  async addToCart(item: CartItem): Promise<void> {
    await this.cartRepository.addItem(item)
  }

  async removeFromCart(productId: string): Promise<void> {
    await this.cartRepository.removeItem(productId)
  }

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.cartRepository.removeItem(productId)
    } else {
      await this.cartRepository.updateQuantity(productId, quantity)
    }
  }

  async clearCart(): Promise<void> {
    await this.cartRepository.clearCart()
  }
}
