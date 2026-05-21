import { Search, ChevronRight } from 'lucide-react'
import { properties } from '../../data/mockData'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { currency } from '../../utils/formatters'

export const PropertyList = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Property management</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Portfolio overview</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Search properties" />
        </div>
        <button className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">Add property</button>
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      {properties.map((property) => (
        <div key={property.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${property.imageUrl})` }} />
          <div className="space-y-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{property.address}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{property.name}</h2>
              </div>
              <StatusBadge tone="info">{property.units.length} units</StatusBadge>
            </div>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{property.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{property.manager}</span>
              <span>-</span>
              <span>{currency(property.units.reduce((sum, unit) => sum + unit.rent, 0) / Math.max(property.units.length, 1))} avg rent</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800">
              View units <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
