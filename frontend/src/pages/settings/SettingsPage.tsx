import { Settings, Bell, SunMedium } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export const SettingsPage = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Account settings</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Profile & preferences</h1>
        </div>
        <Button variant="secondary" className="inline-flex items-center gap-2">
          <Settings className="h-4 w-4" /> Save settings
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <SunMedium className="h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Theme settings</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode when needed.</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <Button variant="secondary" className="w-full">Toggle dark mode</Button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Notification settings</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Control alerts for payments, maintenance, and system updates.</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <Button variant="secondary" className="w-full">Manage notifications</Button>
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Profile information</p>
        <div className="mt-6 space-y-4">
          <Input label="Business name" placeholder="Smart Rentals Management" />
          <Input label="Contact email" placeholder="amina@smartrentals.com" />
          <Input label="Phone number" placeholder="+254712345678" />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Security</p>
        <div className="mt-6 space-y-4">
          <Input label="Current password" type="password" placeholder="********" />
          <Input label="New password" type="password" placeholder="********" />
          <Input label="Confirm new password" type="password" placeholder="********" />
        </div>
      </div>
    </div>
  </div>
)
