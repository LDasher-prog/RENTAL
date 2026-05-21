import { Download, CalendarDays, FileText } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export const ReportsPage = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Reporting center</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Revenue & occupancy reports</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="inline-flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="secondary" className="inline-flex items-center gap-2">
            <FileText className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Date range</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">May 2025</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">
            <CalendarDays className="h-4 w-4" /> Select range
          </button>
        </div>
        <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300">
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Revenue report</p>
            <p className="mt-2">Track monthly rent collection, arrears, and income projections.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Occupancy report</p>
            <p className="mt-2">Analyze unit availability, vacancy rates, and portfolio performance.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Executive summary</p>
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Total revenue</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">KES 1.8M</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Occupancy rate</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">82%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
