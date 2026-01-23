import { useState } from 'react'
import * as Sentry from '@sentry/react'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/health'

type SendStatus = 'idle' | 'sending' | 'done' | 'error'
type CorsStatus = 'idle' | 'loading' | 'success' | 'fail'

const BookmarkPage = () => {
  const [sentryStatus, setSentryStatus] = useState<SendStatus>('idle')
  const [corsStatus, setCorsStatus] = useState<CorsStatus>('idle')
  const [corsResponse, setCorsResponse] = useState<string>('')

  const handleSendError = async () => {
    setSentryStatus('sending')
    try {
      const eventId = Sentry.captureException(new Error('GlitchTip test error'), {
        tags: { source: 'bookmark-test' },
        level: 'error',
      })
      await Sentry.flush(2000)
      setSentryStatus(eventId ? 'done' : 'error')
    } catch (err) {
      console.error('GlitchTip test send failed', err)
      setSentryStatus('error')
    }
  }

  const handleCorsTest = async () => {
    setCorsStatus('loading')
    setCorsResponse('')
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        mode: 'cors',
        headers: {
          // Hint to server which Origin to allow; browser sets real Origin automatically
          Origin: window.location.origin,
        },
      })

      const text = await res.text()
      setCorsResponse(
        `status: ${res.status}\nheaders: ${[...res.headers.entries()]
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n')}\n\nbody:\n${text}`
      )
      setCorsStatus(res.ok ? 'success' : 'fail')
    } catch (err) {
      console.error('CORS test failed', err)
      setCorsResponse(String(err))
      setCorsStatus('fail')
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-900">GlitchTip 테스트</h2>
        <button
          type="button"
          className="w-fit rounded-md bg-brand-500 px-4 py-2 text-white shadow hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
          onClick={handleSendError}
          disabled={sentryStatus === 'sending'}
        >
          {sentryStatus === 'sending' ? 'Sending…' : 'Send GlitchTip test error'}
        </button>
        <p className="text-sm text-slate-700">
          상태: {sentryStatus === 'idle' && '대기 중'}
          {sentryStatus === 'sending' && '전송 중'}
          {sentryStatus === 'done' && '전송 완료 (GlitchTip 확인)'}
          {sentryStatus === 'error' && '전송 실패 (콘솔 확인)'}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-900">CORS 테스트</h2>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            className="w-fit rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            onClick={handleCorsTest}
            disabled={corsStatus === 'loading'}
          >
            {corsStatus === 'loading' ? '요청 중…' : 'CORS 테스트 요청 보내기'}
          </button>
          <span className="text-sm text-slate-700">
            상태: {corsStatus === 'idle' && '대기 중'}
            {corsStatus === 'loading' && '요청 중'}
            {corsStatus === 'success' && '성공'}
            {corsStatus === 'fail' && '실패'}
          </span>
        </div>
        <pre className="whitespace-pre-wrap break-all rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
          {corsResponse || '응답 대기 중...'}
        </pre>
        <p className="text-xs text-slate-500">요청 URL: {API_URL}</p>
      </section>
    </div>
  )
}

export default BookmarkPage
