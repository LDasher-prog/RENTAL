import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export const VerifyEmailPage = () => (
  <div className="mx-auto max-w-lg space-y-8 text-slate-100">
    <div className="rounded-3xl bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg text-center">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Email verification</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Verify your email</h2>
        <p className="mt-3 text-sm text-slate-400">We've sent a verification link to your inbox. Please follow the instructions to continue.</p>
      </div>

      <div className="space-y-4">
        <Button type="button" className="w-full">
          Resend verification email
        </Button>
        <Link to="/auth/login" className="block text-sm font-semibold text-brand hover:text-brand-dark">
          Back to login
        </Link>
      </div>
    </div>
  </div>
)
