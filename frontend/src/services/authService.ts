import type { RegisterPayload } from '../context/authContextValue'
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
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password })
      return response.data
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  register: async (profile: RegisterPayload) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', profile)
      return response.data
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  forgotPassword: async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email })
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  resetPassword: async (token: string, password: string) => {
    try {
      await api.post('/auth/reset-password', { token, password })
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  logout: async () => {
    return Promise.resolve()
  },
}
