import type { User } from "../entities/user.entity"

export interface AuthRepository {
  login(email: string, password: string): Promise<User>
  register(email: string, password: string, name: string): Promise<User>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
}
