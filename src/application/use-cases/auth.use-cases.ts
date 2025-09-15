import { User } from "@/src/domain/entities/user.entity"
import { AuthRepository } from "@/src/domain/repositories/auth.repository"


export class AuthUseCases {
  constructor(private authRepository: AuthRepository) {}

  async login(email: string, password: string): Promise<User> {
    return await this.authRepository.login(email, password)
  }

  async register(email: string, password: string, name: string): Promise<User> {
    return await this.authRepository.register(email, password, name)
  }

  async logout(): Promise<void> {
    await this.authRepository.logout()
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.authRepository.getCurrentUser()
  }
}
