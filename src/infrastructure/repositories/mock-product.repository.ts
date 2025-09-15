import type { Product } from "../../domain/entities/product.entity"
import type { ProductRepository } from "../../domain/repositories/product.repository"

export class MockProductRepository implements ProductRepository {
  private products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 199.99,
      imageUrl: "/wireless-headphones.png",
      category: "Electronics",
      stock: 50,
      rating: 4.5,
      reviews: 128,
    },
    {
      id: "2",
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring",
      price: 299.99,
      imageUrl: "/images/smartwatch-lifestyle.png",
      category: "Electronics",
      stock: 30,
      rating: 4.3,
      reviews: 89,
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Comfortable running shoes for all terrains",
      price: 129.99,
      imageUrl: "/images/running-shoes-on-track.png",
      category: "Sports",
      stock: 75,
      rating: 4.7,
      reviews: 203,
    },
    {
      id: "4",
      name: "Coffee Maker",
      description: "Automatic coffee maker with programmable settings",
      price: 89.99,
      imageUrl: "/images/modern-coffee-maker.png",
      category: "Home",
      stock: 25,
      rating: 4.2,
      reviews: 67,
    },
    {
      id: "5",
      name: "Laptop Backpack",
      description: "Durable laptop backpack with multiple compartments",
      price: 59.99,
      imageUrl: "/images/laptop-backpack.png",
      category: "Accessories",
      stock: 100,
      rating: 4.4,
      reviews: 156,
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with excellent sound quality",
      price: 79.99,
      imageUrl: "/images/bluetooth-speaker.png",
      category: "Electronics",
      stock: 60,
      rating: 4.6,
      reviews: 94,
    },
  ]

  async getAll(): Promise<Product[]> {
    return Promise.resolve([...this.products])
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id)
    return Promise.resolve(product || null)
  }

  async getByCategory(category: string): Promise<Product[]> {
    const filtered = this.products.filter((p) => p.category === category)
    return Promise.resolve(filtered)
  }

  async search(query: string): Promise<Product[]> {
    const filtered = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()),
    )
    return Promise.resolve(filtered)
  }
}
