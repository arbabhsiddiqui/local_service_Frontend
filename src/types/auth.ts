
export interface User {
  id: string
  email: string
  roleName: string
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  isBootstrapping: boolean
}