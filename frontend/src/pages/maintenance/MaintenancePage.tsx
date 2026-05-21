import { Plus, Search } from 'lucide-react'
import { maintenanceRequests } from '../../data/mockData'
import { StatusBadge } from '../../components/ui/StatusBadge'

const priorityTone = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const

const statusTone = {
  pending: 'warning',
  'in-progress': 'info',
  resolved: 'success',
} as const

export const MaintenancePage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Maintenance hub</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Issue tracking</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
          <Plus className="h-4 w-4" /> New request
        </button>
      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Request pipeline</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Keep tenants informed</h2>
        </div>
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Search requests" />
        </div>
      </div>

      <div className="space-y-4">
        {maintenanceRequests.map((request) => (
          <div key={request.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{request.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{request.unit} - Submitted by {request.submittedBy}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={priorityTone[request.priority]}>{request.priority}</StatusBadge>
                <StatusBadge tone={statusTone[request.status]}>{request.status}</StatusBadge>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{request.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
