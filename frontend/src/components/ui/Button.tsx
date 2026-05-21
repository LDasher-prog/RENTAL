import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand/50'
  const styles = clsx(
    base,
    variant === 'primary' && 'bg-brand text-white hover:bg-brand-dark',
    variant === 'secondary' && 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
    variant === 'ghost' && 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    className,
  )

  return (
    <button {...props} className={styles}>
      {children}
    </button>
  )
}
