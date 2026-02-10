/**
 * MobileHeader 컴포넌트
 * 모바일 환경에서 상단 헤더 표시
 */

import { Link } from 'react-router-dom'
import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'

export const MobileHeader = () => {
  // 모바일 상단 헤더: 768px 미만에서만 표시
  return (
    <header className="fixed top-0 left-0 right-0 w-full max-w-full bg-[#F9FBFE]/90 backdrop-blur-xl border-b border-gray-200/50 z-50 md:hidden mobile-safe-area-top">
      <div className="flex items-center justify-between px-3 xs:px-4 sm:px-5 h-12 xs:h-14 sm:h-16">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-1.5 xs:gap-2">
          <div className="relative w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8">
            <img src={BrandLogo} alt="API Wiki Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-base xs:text-lg sm:text-xl font-mono font-medium text-brand-500 tracking-tight">
            API Wiki
          </span>
        </Link>
      </div>
    </header>
  )
}
