import { Wifi, WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export const NetworkStatus = () => {
  const online = useOnlineStatus()

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-soft transition ${
        online ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
      }`}
      role="status"
      aria-live="polite"
    >
      {online ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
      {online ? 'Online' : 'Offline mode'}
    </div>
  )
}
