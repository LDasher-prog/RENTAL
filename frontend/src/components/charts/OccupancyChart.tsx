import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { label: 'Occupied', value: 72 },
  { label: 'Vacant', value: 18 },
  { label: 'Maintenance', value: 10 },
]

export const OccupancyChart = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-5">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Occupancy</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Status distribution</h3>
    </div>
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#6b7280" />
          <YAxis tickLine={false} axisLine={false} stroke="#6b7280" />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="value" fill="#22c55e" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)
