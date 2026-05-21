import { Search, ChevronRight } from 'lucide-react'
import { tenants } from '../../data/mockData'
import { StatusBadge } from '../../components/ui/StatusBadge'

const badgeTone = {
  paid: 'success',
  due: 'warning',
  overdue: 'danger',
} as const

export const TenantList = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tenant directory</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Manage residents</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Search tenants" />
        </div>
        <button className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">Add tenant</button>
      </div>
    </div>

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Rent</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{tenant.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{tenant.email}</div>
                </td>
                <td className="px-6 py-4">{tenant.unit}</td>
                <td className="px-6 py-4">
                  <StatusBadge tone={badgeTone[tenant.paymentStatus]}>{tenant.paymentStatus}</StatusBadge>
                </td>
                <td className="px-6 py-4">KES 24,000</td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">
                    View <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
