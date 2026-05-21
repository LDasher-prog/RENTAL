import { createContext } from 'react'
import type { UserProfile } from '../types'

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: UserProfile['role']
}

export interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  initialized: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (profile: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
