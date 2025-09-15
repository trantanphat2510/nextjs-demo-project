import "reflect-metadata"

// Repositories
import type { ProductRepository } from "../../domain/repositories/product.repository"
import type { CartRepository } from "../../domain/repositories/cart.repository"
import type { AuthRepository } from "../../domain/repositories/auth.repository"
import { MockProductRepository } from "../repositories/mock-product.repository"
import { LocalCartRepository } from "../repositories/local-cart.repository"
import { MockAuthRepository } from "../repositories/mock-auth.repository"

// Use Cases
import { ProductUseCases } from "../../application/use-cases/product.use-cases"
import { CartUseCases } from "../../application/use-cases/cart.use-cases"
import { AuthUseCases } from "../../application/use-cases/auth.use-cases"

class DIContainer {
  private instances = new Map<string, any>()

  register<T>(key: string, factory: () => T): void {
    this.instances.set(key, factory)
  }

  resolve<T>(key: string): T {
    const factory = this.instances.get(key)
    if (!factory) {
      throw new Error(`No registration found for ${key}`)
    }
    return factory()
  }
}

// Create container instance
export const container = new DIContainer()

// Register repositories
container.register<ProductRepository>("ProductRepository", () => new MockProductRepository())
container.register<CartRepository>("CartRepository", () => new LocalCartRepository())
container.register<AuthRepository>("AuthRepository", () => new MockAuthRepository())

// Register use cases
container.register<ProductUseCases>(
  "ProductUseCases",
  () => new ProductUseCases(container.resolve<ProductRepository>("ProductRepository")),
)

container.register<CartUseCases>(
  "CartUseCases",
  () => new CartUseCases(container.resolve<CartRepository>("CartRepository")),
)

container.register<AuthUseCases>(
  "AuthUseCases",
  () => new AuthUseCases(container.resolve<AuthRepository>("AuthRepository")),
)
