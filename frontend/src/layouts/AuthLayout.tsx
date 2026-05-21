import { Outlet, Link } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between rounded-3xl bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-lg sm:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Smart Rentals</p>
            <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Property management built for landlords, tenants and caretakers.</h1>
          </div>
          <Link to="/auth/login" className="rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
            Return to login
          </Link>
        </div>

        <div className="grid gap-6 rounded-3xl bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30 sm:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
