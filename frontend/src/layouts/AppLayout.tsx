import { Outlet, NavLink } from 'react-router-dom'
import { Menu, Bell, Home, Building, Users, CreditCard, Wrench, FileText, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Properties', path: '/properties', icon: Building },
  { label: 'Tenants', path: '/tenants', icon: Users },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export const AppLayout = () => {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-20 w-72 transform bg-white shadow-soft transition duration-300 dark:bg-slate-900 lg:relative lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
          <div className="flex h-full flex-col px-5 py-6">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-brand text-white grid place-items-center font-bold">SR</div>
              <div>
                <p className="font-semibold">Smart Rentals</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Property management</p>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive ? 'bg-brand text-white shadow-soft' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              <p className="font-semibold">Fast support</p>
              <p className="mt-1">Manage rent, tenants and maintenance from one dashboard.</p>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col lg:ml-72">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
            <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Toggle navigation"
                  onClick={() => setOpen((prev) => !prev)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back,</p>
                  <h1 className="text-lg font-semibold">{user?.name ?? 'Manager'}</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button aria-label="View notifications" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <Bell className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <section className="flex-1 px-4 py-6 lg:px-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}
