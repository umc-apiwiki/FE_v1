/**
 * MobileHeader 컴포넌트
 * 모바일 환경에서 상단 헤더 표시
 * Vite 환경에서는 public 폴더의 정적 파일 직접 참조
 */

import { Link } from 'react-router-dom'

export const MobileHeader = () => {
  return (
    {/* 모바일 상단 헤더: 768px 미만에서만 표시 */}
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <img src="/logo.svg" alt="API Wiki Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-lg font-bold text-blue-600">API Wiki</span>
        </Link>
      </div>
    </header>
  )
}
