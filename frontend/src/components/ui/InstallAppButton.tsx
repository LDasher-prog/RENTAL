import { Download } from 'lucide-react'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'

export const InstallAppButton = () => {
  const { canInstall, install } = useInstallPrompt()

  if (!canInstall) {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => void install()}
      className="fixed bottom-16 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
    >
      <Download className="h-4 w-4" />
      Install app
    </button>
  )
}
