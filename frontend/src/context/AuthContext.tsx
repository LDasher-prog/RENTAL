import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services/authService'
import type { UserProfile } from '../types'
import { clearStoredAuth, readStoredAuth, writeStoredAuth } from '../services/authStorage'
import { AuthContext } from './authContextValue'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [storedAuth] = useState(() => readStoredAuth())
  const [user, setUser] = useState<UserProfile | null>(() => storedAuth?.user ?? null)
  const [token, setToken] = useState<string | null>(() => storedAuth?.token ?? null)
  const initialized = true

  const persist = useCallback((userData: UserProfile, authToken: string, remember = true) => {
    setUser(userData)
    setToken(authToken)

    if (remember) {
      writeStoredAuth({ user: userData, token: authToken })
    } else {
      clearStoredAuth()
    }
  }, [])

  const loginWithGoogle = useCallback(async (idToken: string, remember = true) => {
    const response = await authService.loginWithGoogle(idToken)
    persist(response.user, response.token, remember)
  }, [persist])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
    setToken(null)
    clearStoredAuth()
  }, [])

  const value = useMemo(
    () => ({ user, token, initialized, loginWithGoogle, logout }),
    [user, token, initialized, loginWithGoogle, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
