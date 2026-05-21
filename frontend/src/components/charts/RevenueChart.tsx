import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', revenue: 420000 },
  { month: 'Feb', revenue: 540000 },
  { month: 'Mar', revenue: 610000 },
  { month: 'Apr', revenue: 700000 },
  { month: 'May', revenue: 760000 },
  { month: 'Jun', revenue: 820000 },
]

export const RevenueChart = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Monthly collections</h3>
      </div>
    </div>
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#6b7280" />
          <YAxis tickLine={false} axisLine={false} stroke="#6b7280" />
          <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value)} />
          <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)
