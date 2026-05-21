import type { ReactNode } from 'react'
import clsx from 'clsx'

interface StatusBadgeProps {
  children: ReactNode
  tone?: 'success' | 'warning' | 'danger' | 'info'
}

const toneClasses: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
}

export const StatusBadge = ({ children, tone = 'info' }: StatusBadgeProps) => (
  <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold', toneClasses[tone])}>{children}</span>
)
