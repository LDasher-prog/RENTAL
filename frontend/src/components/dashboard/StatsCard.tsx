import type { ReactNode } from 'react'
import clsx from 'clsx'

interface StatsCardProps {
  title: string
  value: string
  detail: string
  accent?: 'emerald' | 'blue' | 'amber' | 'rose'
  icon: ReactNode
}

const accentStyles: Record<NonNullable<StatsCardProps['accent']>, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200',
  blue: 'bg-sky-500/10 text-sky-900 dark:text-sky-200',
  amber: 'bg-amber-500/10 text-amber-900 dark:text-amber-200',
  rose: 'bg-rose-500/10 text-rose-900 dark:text-rose-200',
}

export const StatsCard = ({ title, value, detail, accent = 'blue', icon }: StatsCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
      </div>
      <div className={clsx('rounded-3xl p-3', accentStyles[accent])}>{icon}</div>
    </div>
    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
  </div>
)
