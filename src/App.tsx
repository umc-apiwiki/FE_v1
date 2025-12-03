const quickLinks = [
  { label: 'API 가이드', href: '#' },
  { label: '토큰 발급', href: '#' },
  { label: '요청 샘플', href: '#' },
]

const updates = [
  { title: 'v1.4 릴리스', detail: '신규 검색 API와 Webhook 알림이 추가되었습니다.' },
  { title: '모니터링', detail: '실시간 대시보드가 향상되어 오류 추적이 쉬워졌습니다.' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-4 py-1 text-sm font-semibold text-brand-200">
            APIWIKI FE
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Vite · Tailwind · TypeScript 기반 프런트엔드
          </h1>
          <p className="text-lg text-slate-300">
            공용 API 문서, 샘플 코드, 운영 현황을 한 화면에서 확인할 수 있는 사내 포털을 구축할 준비가 끝났습니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-brand-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-400">
              대시보드 열기
            </button>
            <button className="rounded-lg border border-slate-700 px-5 py-3 text-base font-semibold text-white transition hover:border-slate-500">
              문서 살펴보기
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">빠른 작업</div>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label} className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-3 text-sm font-medium">
                  <a href={link.href}>{link.label}</a>
                  <span className="text-xs text-slate-500">→</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-slate-800 pt-4">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">업데이트</div>
            <ul className="mt-3 space-y-3">
              {updates.map((item) => (
                <li key={item.title} className="rounded-xl border border-slate-800 px-4 py-3">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
