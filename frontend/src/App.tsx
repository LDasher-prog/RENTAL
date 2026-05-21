import { AnimatePresence, motion } from 'framer-motion'
import { AppRoutes } from './routes/AppRoutes'
import { InstallAppButton } from './components/ui/InstallAppButton'
import { NetworkStatus } from './components/ui/NetworkStatus'
import { useAuth } from './hooks/useAuth'

function App() {
  const { initialized } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={initialized ? 'app-ready' : 'app-loading'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="min-h-screen"
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
      <InstallAppButton />
      <NetworkStatus />
    </div>
  )
}

export default App
