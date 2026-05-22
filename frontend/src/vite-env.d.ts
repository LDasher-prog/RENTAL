/// <reference types="vite/client" />

interface Navigator {
  standalone?: boolean
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (options: {
            client_id: string
            callback: (response: { credential?: string }) => void
            ux_mode?: 'popup' | 'redirect'
          }) => void
          renderButton: (container: HTMLElement, options: Record<string, unknown>) => void
          prompt?: () => void
        }
      }
    }
  }
}

export {}
