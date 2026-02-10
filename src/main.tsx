import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// PWA Service Worker 등록
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('새로운 버전이 있습니다. 업데이트하시겠습니까?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('앱이 오프라인에서 사용 가능합니다.')
  },
})

const sentryDsn = import.meta.env.VITE_SENTRY_DSN
const umamiUrl = import.meta.env.VITE_UMAMI_URL
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

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

if (umamiUrl && umamiWebsiteId) {
  const umami = document.createElement('script')
  umami.src = umamiUrl
  umami.async = true
  umami.defer = true
  umami.dataset.websiteId = umamiWebsiteId
  document.head.appendChild(umami)
} else {
  console.warn('Umami disabled: VITE_UMAMI_URL or VITE_UMAMI_WEBSITE_ID is missing')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
