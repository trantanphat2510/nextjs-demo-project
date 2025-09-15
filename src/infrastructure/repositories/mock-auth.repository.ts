import type { User } from "../../domain/entities/user.entity"
import type { AuthRepository } from "../../domain/repositories/auth.repository"

export class MockAuthRepository implements AuthRepository {
  private readonly USER_KEY = "ecommerce-user"

  async login(email: string, password: string): Promise<User> {
    // Mock authentication - in real app, this would call an API
    if (email === "demo@example.com" && password === "password") {
      const user: User = {
        id: "1",
        email,
        name: "Demo User",
        avatar: "/diverse-user-avatars.png",
        isAuthenticated: true,
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user))
      }

      return user
    }

    throw new Error("Invalid credentials")
  }

  async register(email: string, password: string, name: string): Promise<User> {
    // Mock registration
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: "/diverse-user-avatars.png",
      isAuthenticated: true,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }

    return user
  }

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.USER_KEY)
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === "undefined") {
      return null
    }

    const stored = localStorage.getItem(this.USER_KEY)
    return stored ? JSON.parse(stored) : null
  }
}
