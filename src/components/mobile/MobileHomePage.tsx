/**
 * MobileHomePage 컴포넌트
 * 모바일 환경에서 메인 홈 페이지 표시
 * 로직은 useMobileHome Hook으로 완전히 분리
 */

import { motion } from 'framer-motion'
import { useMobileHome } from '../../hooks/useMobileHome'
import { MobileBottomNavigation } from './MobileBottomNavigation'
import { MobileSearchModal } from './MobileSearchModal'
import { MobileHeader } from './MobileHeader'

export const MobileHomePage = () => {
  const { isSearchModalOpen, categories, scrollRef, scrollProgress, handleScroll, handleCategoryClick, setIsSearchModalOpen } = useMobileHome()

  return (
    <div className="relative w-full min-h-screen max-w-full overflow-x-hidden bg-gradient-to-b from-blue-50 to-white pb-20">
      <MobileHeader />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 xs:px-5 sm:px-6 pt-14">
        {/* 로고 */}
        <motion.div
          className="mb-4 xs:mb-5 sm:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.svg" alt="API Wiki Logo" className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20" />
        </motion.div>

        {/* 설명 텍스트 */}
        <motion.p
          className="text-center text-gray-700 text-sm xs:text-base sm:text-lg mb-4 xs:mb-5 sm:mb-6 leading-relaxed px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          개발자가 함께 만드는 API 지식,
          <br />
          실시간으로 업데이트됩니다
        </motion.p>

        {/* 검색바 */}
        <motion.div
          className="w-full max-w-md mb-4 xs:mb-5 sm:mb-6 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setIsSearchModalOpen(true)}
        >
          <div className="flex items-center justify-between px-3 xs:px-4 py-2.5 xs:py-3 bg-white rounded-lg xs:rounded-xl shadow-md border border-gray-200 hover:border-blue-500 transition-colors">
            <span className="text-gray-400 text-xs xs:text-sm sm:text-base">궁금한 API를 검색해보세요</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        {/* 카테고리 캐러셀 */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="flex-shrink-0 px-3 xs:px-4 py-1.5 xs:py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-xs xs:text-sm font-medium text-gray-700 whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* 프로그레스 인디케이터 */}
          <div className="relative w-full h-1 mt-3 xs:mt-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 w-2 xs:w-3 h-full bg-blue-600 rounded-full transition-all duration-200"
              style={{ left: `calc((100% - 0.5rem) * ${scrollProgress / 100})` }}
            />
          </div>
        </motion.div>
      </main>
      {/* 하단 네비게이션 */}
      <MobileBottomNavigation />

      {/* 검색 모달 */}
      <MobileSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  )
}
