/**
 * MobileHomePage 컴포넌트
 * 모바일 환경에서 메인 홈 페이지 표시
 * 로직은 useMobileHome Hook으로 완전히 분리
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useMobileHome } from '../../hooks/useMobileHome'
import { MobileBottomNavigation } from './MobileBottomNavigation'
import { MobileSearchModal } from './MobileSearchModal'
import { MobileAPICard } from './MobileAPICard'
import { MobileNewsCard } from './MobileNewsCard'

export const MobileHomePage = () => {
  const { accessToken } = useAuth()
  const isAuthenticated = !!accessToken
  const {
    scrollProgress,
    isSearchModalOpen,
    isActive,
    popularAPIs,
    suggestedAPIs,
    newsItems,
    categories,
    scrollRef,
    scrollContentRef,
    handleScroll,
    handleScrollToTop,
    handleCategoryClick,
    setIsSearchModalOpen,
    setIsActive,
  } = useMobileHome()

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-blue-600">API Wiki</span>
        </div>
        {isAuthenticated && <span className="text-sm font-medium text-gray-600">0p</span>}
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col items-center justify-center h-full px-4 pt-14 pb-20">
        {/* 로고 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.svg" alt="API Wiki Logo" className="w-24 h-24" />
        </motion.div>

        {/* 설명 텍스트 */}
        <motion.p
          className="text-center text-gray-700 text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          개발자가 함께 만드는 API 지식,
          <br />
          실시간으로 업데이트됩니다
        </motion.p>

        {/* 검색바 - 클릭하면 모달 열림 */}
        <motion.div
          className="w-full max-w-md mb-8 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setIsSearchModalOpen(true)}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200 hover:border-blue-500 transition-colors">
            <span className="text-gray-400">궁금한 API를 검색해보세요</span>
            <img src="/mingcute_search-line.svg" alt="Search" className="w-5 h-5" />
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
                className="flex-shrink-0 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* 프로그레스 인디케이터 */}
          <div className="relative w-full h-1 mt-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 w-3 h-full bg-blue-600 rounded-full transition-all duration-200"
              style={{ left: `calc((100% - 0.75rem) * ${scrollProgress / 100})` }}
            />
          </div>
        </motion.div>
      </main>

      {/* 스크롤 인디케이터 - 하단 고정 (메인 화면에서만 표시) */}
      <motion.button
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-gray-200"
        onClick={handleScrollToTop}
        animate={{
          opacity: isActive ? 0 : 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.3 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          pointerEvents: isActive ? 'none' : 'auto',
        }}
        aria-label="위로 스크롤"
      >
        <img src="/nav-arrow-up-solid.svg" alt="Scroll to top" className="w-6 h-6" />
      </motion.button>

      {/* 스크롤 컨텐츠 섹션 */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 z-50 bg-white overflow-y-auto pt-14 pb-20"
            ref={scrollContentRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* 내릴 때: 역삼각형 (아래쪽 화살표) */}
            <motion.button
              className="fixed top-20 left-1/2 -translate-x-1/2 z-30 p-3 bg-white rounded-full shadow-lg border border-gray-200 rotate-180"
              onClick={() => setIsActive(false)}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-label="아래로 스크롤"
            >
              <img src="/nav-arrow-up-solid.svg" alt="Scroll down" className="w-6 h-6" />
            </motion.button>

            <div className="px-4 pt-16">
              {/* Latest News */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Latest News</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {newsItems.map((news) => (
                    <div key={news.id} className="flex-shrink-0 w-64">
                      <MobileNewsCard news={news} />
                    </div>
                  ))}
                </div>
                <div className="relative w-[15%] h-1 mt-3 mx-auto bg-gray-200 rounded-full">
                  <div className="absolute left-0 top-0 w-3 h-full bg-blue-600 rounded-full" />
                </div>
              </section>

              {/* Recent Popular */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Popular</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {popularAPIs.map((api) => (
                    <div key={api.id} className="flex-shrink-0 w-64">
                      <MobileAPICard api={api} />
                    </div>
                  ))}
                </div>
                <div className="relative w-[15%] h-1 mt-3 mx-auto bg-gray-200 rounded-full">
                  <div className="absolute left-0 top-0 w-3 h-full bg-blue-600 rounded-full" />
                </div>
              </section>

              {/* Suggest API */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Suggest API</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {suggestedAPIs.map((api) => (
                    <div key={api.id} className="flex-shrink-0 w-64">
                      <MobileAPICard api={api} />
                    </div>
                  ))}
                </div>
                <div className="relative w-[15%] h-1 mt-3 mx-auto bg-gray-200 rounded-full">
                  <div className="absolute left-0 top-0 w-3 h-full bg-blue-600 rounded-full" />
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 네비게이션 */}
      <MobileBottomNavigation />

      {/* 검색 모달 */}
      <MobileSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  )
}
