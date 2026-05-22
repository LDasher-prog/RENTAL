import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton'
import { useAuth } from '../../hooks/useAuth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleGoogleSuccess = async (idToken: string) => {
    setError(null)
    setIsSigningIn(true)

    try {
      await loginWithGoogle(idToken)
      navigate('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to sign in with Google')
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 py-8 text-slate-100">
      <div className="rounded-3xl bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Landlord login</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Sign in with Google</h2>
          <p className="mt-3 text-sm text-slate-400">Use your Google account to access Smart Rentals.</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <GoogleSignInButton
              onSuccess={handleGoogleSuccess}
              onError={(message) => setError(message)}
            />
          </div>

          {isSigningIn && <p className="text-sm text-slate-300">Signing in with Google…</p>}
          {error && <p className="text-sm text-rose-400">{error}</p>}
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/70 p-5 text-center text-sm text-slate-400 shadow-sm shadow-slate-950/50">
        Need an account?{' '}
        <Link to="/auth/register" className="font-semibold text-white hover:text-brand">
          Sign up with Google
        </Link>
      </div>
    </div>
  )
}
