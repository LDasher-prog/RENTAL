import { DollarSign, Home, Layers, ShieldCheck } from 'lucide-react'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { RevenueChart } from '../../components/charts/RevenueChart'
import { OccupancyChart } from '../../components/charts/OccupancyChart'
import { properties, payments, maintenanceRequests, tenants } from '../../data/mockData'
import { currency } from '../../utils/formatters'

export const DashboardOverview = () => {
  const totalUnits = properties.reduce((sum, property) => sum + property.units.length, 0)
  const occupiedUnits = properties.reduce((sum, property) => sum + property.units.filter((unit) => unit.status === 'occupied').length, 0)
  const vacantUnits = properties.reduce((sum, property) => sum + property.units.filter((unit) => unit.status === 'vacant').length, 0)
  const monthlyRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingPayments = payments.filter((payment) => payment.status === 'pending').length
  const pendingRequests = maintenanceRequests.filter((request) => request.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-4">
        <StatsCard title="Total units" value={`${totalUnits}`} detail="Managed rental spaces" accent="blue" icon={<Home className="h-5 w-5" />} />
        <StatsCard title="Occupied units" value={`${occupiedUnits}`} detail="Units with active tenants" accent="emerald" icon={<ShieldCheck className="h-5 w-5" />} />
        <StatsCard title="Vacant units" value={`${vacantUnits}`} detail="Ready for leasing" accent="amber" icon={<Layers className="h-5 w-5" />} />
        <StatsCard title="Monthly revenue" value={currency(monthlyRevenue)} detail={`${pendingPayments} pending payments`} accent="rose" icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <RevenueChart />
        <OccupancyChart />
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Support overview</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Maintenance queue</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-300">{pendingRequests} pending</span>
          </div>
          <div className="space-y-4">
            {maintenanceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{request.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{request.unit}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">{request.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Recent activity</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tenant growth</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">3 new move-ins this month</p>
              </div>
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">+5.2%</p>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Revenue trend</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Strong portfolio performance</p>
              </div>
              <p className="text-lg font-semibold text-blue-600 dark:text-sky-300">+8.7%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tenant snapshot</p>
          <div className="mt-6 grid gap-4">
            {tenants.slice(0, 3).map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{tenant.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{tenant.unit}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tenant.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : tenant.paymentStatus === 'overdue' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'}`}>{tenant.paymentStatus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
