import { Download, Plus, Search } from 'lucide-react'
import { payments } from '../../data/mockData'
import { currency } from '../../utils/formatters'

export const PaymentsPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Payment records</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Rent collection</h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">
          <Download className="h-4 w-4" /> Export report
        </button>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
          <Plus className="h-4 w-4" /> Record payment
        </button>
      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Latest transactions</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Payment history</h2>
        </div>
        <div className="relative max-w-sm grow">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Search payments" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{payment.tenantName}</td>
                <td className="px-6 py-4">{payment.unit}</td>
                <td className="px-6 py-4">{currency(payment.amount)}</td>
                <td className="px-6 py-4 capitalize text-slate-600 dark:text-slate-300">{payment.status}</td>
                <td className="px-6 py-4">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
