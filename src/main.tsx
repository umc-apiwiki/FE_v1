import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? 1.0),
    replaysSessionSampleRate: Number(import.meta.env.VITE_SENTRY_REPLAYS_SESSION_RATE ?? 0.1),
    replaysOnErrorSampleRate: Number(import.meta.env.VITE_SENTRY_REPLAYS_ERROR_RATE ?? 1.0),
    environment: import.meta.env.MODE,
  })
} else {
  // 빌드/배포 시점에 DSN이 비어 있으면 SDK가 초기화되지 않음
  console.warn('Sentry disabled: VITE_SENTRY_DSN is missing')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
