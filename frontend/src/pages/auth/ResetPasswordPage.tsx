import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { authService } from '../../services/authService'

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetForm = z.infer<typeof resetSchema>

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>()

  const onSubmit = async (values: ResetForm) => {
    const result = resetSchema.safeParse(values)
    if (!result.success) {
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ResetForm
        setError(field, { type: 'manual', message: error.message })
      })
      return
    }

    const token = searchParams.get('token')
    if (!token) {
      setError('root', {
        type: 'manual',
        message: 'Reset token is missing. Please use the link from your email.',
      })
      return
    }

    setSuccessMessage('')

    try {
      await authService.resetPassword(token, values.password)
      setSuccessMessage('Your password has been reset. Redirecting you to sign in...')
      setTimeout(() => navigate('/auth/login'), 1200)
    } catch (error) {
      setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Unable to reset password',
      })
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 text-slate-100">
      <div className="rounded-3xl bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Reset password</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Choose a new password</h2>
          <p className="mt-3 text-sm text-slate-400">Secure your account with a strong password.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="New password" type="password" placeholder="Enter new password" {...register('password')} error={errors.password?.message} />
          <Input label="Confirm password" type="password" placeholder="Confirm password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Resetting...' : 'Reset password'}
          </Button>
          {successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}
          {errors.root?.message && <p className="text-sm text-rose-400">{errors.root.message}</p>}
        </form>
      </div>

      <div className="rounded-3xl bg-slate-900/70 p-5 text-center text-sm text-slate-400 shadow-sm shadow-slate-950/50">
        Back to login?{' '}
        <Link to="/auth/login" className="font-semibold text-white hover:text-brand">
          Sign in
        </Link>
      </div>
    </div>
  )
}
