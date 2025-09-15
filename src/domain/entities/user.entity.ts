export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAuthenticated: boolean
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}
