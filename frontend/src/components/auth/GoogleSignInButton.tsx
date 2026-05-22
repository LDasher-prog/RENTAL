import { useEffect, useRef } from 'react'

interface GoogleSignInButtonProps {
  onSuccess: (idToken: string) => void
  onError?: (message: string) => void
}

export const GoogleSignInButton = ({ onSuccess, onError }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      onError?.('Google client ID is not configured.')
      return
    }

    const loadScript = () => {
      if (window.google?.accounts?.id) {
        initializeButton()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initializeButton
      document.head.appendChild(script)
    }

    const initializeButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) {
        return
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential)
          } else {
            onError?.('Google authentication failed.')
          }
        },
        ux_mode: 'popup',
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 280,
        shape: 'rectangular',
      })
    }

    loadScript()
  }, [onError, onSuccess])

  return <div ref={buttonRef} />
}
