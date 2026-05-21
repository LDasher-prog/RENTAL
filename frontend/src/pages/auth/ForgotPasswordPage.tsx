import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const forgotSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

type ForgotForm = z.infer<typeof forgotSchema>

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>()

  const onSubmit = async (values: ForgotForm) => {
    const result = forgotSchema.safeParse(values)
    if (!result.success) {
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ForgotForm
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
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Account recovery</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Reset your password</h2>
          <p className="mt-3 text-sm text-slate-400">Enter your email to receive password reset instructions.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email address" type="email" placeholder="you@domain.com" {...register('email')} error={errors.email?.message} />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Sending link...' : 'Send reset link'}
          </Button>
        </form>
      </div>

      <div className="rounded-3xl bg-slate-900/70 p-5 text-center text-sm text-slate-400 shadow-sm shadow-slate-950/50">
        Remembered your password?{' '}
        <Link to="/auth/login" className="font-semibold text-white hover:text-brand">
          Sign in
        </Link>
      </div>
    </div>
  )
}
