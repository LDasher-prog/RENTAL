import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: Array<'landlord' | 'caretaker' | 'tenant'>
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, initialized } = useAuth()

  if (!initialized) {
    return <div className="min-h-screen flex items-center justify-center p-4">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
