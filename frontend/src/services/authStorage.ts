import type { UserProfile } from '../types'

export const authStorageKey = 'smart-rentals-auth'

export interface StoredAuth {
  user: UserProfile
  token: string
}

export const readStoredAuth = (): StoredAuth | null => {
  const stored = window.localStorage.getItem(authStorageKey)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as StoredAuth
  } catch {
    window.localStorage.removeItem(authStorageKey)
    return null
  }
}

export const writeStoredAuth = (data: StoredAuth) => {
  window.localStorage.setItem(authStorageKey, JSON.stringify(data))
}

export const clearStoredAuth = () => {
  window.localStorage.removeItem(authStorageKey)
}
