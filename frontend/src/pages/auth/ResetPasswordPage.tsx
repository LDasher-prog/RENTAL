import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetForm = z.infer<typeof resetSchema>

export const ResetPasswordPage = () => {
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
    await new Promise((resolve) => setTimeout(resolve, 500))
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
