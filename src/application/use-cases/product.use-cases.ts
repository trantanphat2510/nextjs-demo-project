import { Product } from "@/src/domain/entities/product.entity"
import { ProductRepository } from "@/src/domain/repositories/product.repository"


export class ProductUseCases {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAll()
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.getById(id)
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.productRepository.getByCategory(category)
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await this.productRepository.search(query)
  }
}
