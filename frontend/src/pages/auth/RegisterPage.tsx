import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

const registerSchema = z.object({
  name: z.string().min(3, 'Your name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['landlord', 'caretaker', 'tenant']),
})

type RegisterForm = z.infer<typeof registerSchema>

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register: signUp } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>()

  const onSubmit = async (values: RegisterForm) => {
    const result = registerSchema.safeParse(values)
    if (!result.success) {
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof RegisterForm
        setError(field, { type: 'manual', message: error.message })
      })
      return
    }

    try {
      await signUp({ name: values.name, email: values.email, password: values.password, role: values.role })
      navigate('/auth/verify-email')
    } catch (error) {
      setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Unable to create account',
      })
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 text-slate-100">
      <div className="rounded-3xl bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Start free trial</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Create an account</h2>
          <p className="mt-3 text-sm text-slate-400">Ready for a powerful rental management experience.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Full name" placeholder="Amina Juma" {...register('name')} error={errors.name?.message} />
          <Input label="Email address" type="email" placeholder="you@domain.com" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" placeholder="Create a strong password" {...register('password')} error={errors.password?.message} />
          <label className="block text-sm font-medium text-slate-200">
            Role
            <select {...register('role')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10">
              <option value="landlord">Landlord</option>
              <option value="caretaker">Caretaker</option>
              <option value="tenant">Tenant</option>
            </select>
          </label>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
          {errors.root?.message && <p className="text-sm text-rose-400">{errors.root.message}</p>}
        </form>
      </div>

      <div className="rounded-3xl bg-slate-900/70 p-5 text-center text-sm text-slate-400 shadow-sm shadow-slate-950/50">
        Already registered?{' '}
        <Link to="/auth/login" className="font-semibold text-white hover:text-brand">
          Sign in
        </Link>
      </div>
    </div>
  )
}
