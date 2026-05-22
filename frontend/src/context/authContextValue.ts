import { createContext } from 'react'
import type { UserProfile } from '../types'

export interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  initialized: boolean
  loginWithGoogle: (idToken: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
