import type { UserProfile } from '../types'
import { api } from './api'
import axios from 'axios'

interface AuthResponse {
  user: UserProfile
  token: string
}

const getAuthErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && typeof error.response?.data?.message === 'string') {
    return error.response.data.message
  }

  return 'Unable to complete authentication request'
}

export const authService = {
  loginWithGoogle: async (idToken: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/google', { idToken })
      return response.data
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  logout: async () => {
    return Promise.resolve()
  },
}
