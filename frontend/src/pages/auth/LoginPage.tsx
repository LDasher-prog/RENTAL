import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ defaultValues: { remember: true } })

  const onSubmit = async (values: LoginForm) => {
    const result = loginSchema.safeParse(values)
    if (!result.success) {
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof LoginForm
        setError(field, { type: 'manual', message: error.message })
      })
      return
    }

    try {
      await login(values.email, values.password, values.remember)
      navigate('/dashboard')
    } catch (error) {
      setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Unable to sign in',
      })
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 py-8 text-slate-100">
      <div className="rounded-3xl bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Landlord login</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Sign in to Smart Rentals</h2>
          <p className="mt-3 text-sm text-slate-400">Secure access for landlords, caretakers, and tenants.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email address" type="email" placeholder="you@domain.com" {...register('email')} error={errors.email?.message} />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              {...register('password')}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-11 text-slate-500 transition hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-slate-950 text-brand focus:ring-brand" {...register('remember')} />
              Remember me
            </label>
            <Link to="/auth/forgot-password" className="text-sm font-medium text-brand hover:text-brand-dark">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          {errors.root?.message && <p className="text-sm text-rose-400">{errors.root.message}</p>}
        </form>
      </div>

      <div className="rounded-3xl bg-slate-900/70 p-5 text-center text-sm text-slate-400 shadow-sm shadow-slate-950/50">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-semibold text-white hover:text-brand">
          Create one
        </Link>
      </div>
    </div>
  )
}
