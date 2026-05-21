import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

export const EmptyState = ({ title, message, action }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">No records yet</p>
    <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
)
