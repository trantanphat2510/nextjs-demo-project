import type { Product } from "../entities/product.entity"

export interface ProductRepository {
  getAll(): Promise<Product[]>
  getById(id: string): Promise<Product | null>
  getByCategory(category: string): Promise<Product[]>
  search(query: string): Promise<Product[]>
}
