import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
      {label && <span className="mb-2 block text-sm font-semibold">{label}</span>}
      <input
        {...props}
        className={clsx(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
          className,
        )}
      />
      {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
    </label>
  )
}
