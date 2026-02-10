/**
 * MobileSearchModal 컴포넌트
 * 모바일 환경에서 검색 모달 표시
 * 로직은 useMobileSearch Hook으로 완전히 분리
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useMobileSearch } from '../../hooks/useMobileSearch'

type MobileSearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const MobileSearchModal = ({ isOpen, onClose }: MobileSearchModalProps) => {
  const {
    query,
    recentSearches,
    suggestions,
    modalRef,
    setQuery,
    handleSearch,
    handleKeyPress,
    removeRecentSearch,
  } = useMobileSearch({ isOpen, onClose })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-xl overflow-hidden" ref={modalRef}>
            {/* 검색바 */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="궁금한 API를 검색해보세요"
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="검색"
                  >
                    <img src="/mingcute_search-line.svg" alt="Search" width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 검색 제안 또는 Recent 섹션 */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim().length >= 1 ? (
                /* 자동완성 제안 */
                <>
                  {suggestions.length > 0 && (
                    <div className="p-4">
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-gray-700">검색 제안</span>
                      </div>
                      <div className="space-y-1">
                        {suggestions.map((item, idx) => (
                          <button
                            key={`suggestion-${idx}`}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                            onClick={() => handleSearch(item)}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src="/mingcute_search-line.svg"
                                alt="Search"
                                width={20}
                                height={20}
                              />
                            </div>
                            <span className="flex-1 text-gray-900">
                              {item.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                                part.toLowerCase() === query.toLowerCase() ? (
                                  <span key={i} className="font-bold text-blue-600">
                                    {part}
                                  </span>
                                ) : (
                                  part
                                )
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Recent 섹션 */
                recentSearches.length > 0 && (
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-gray-700">Recent</span>
                    </div>

                    <div className="space-y-1">
                      {recentSearches.map((item, idx) => (
                        <button
                          key={`recent-${idx}`}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                          onClick={() => handleSearch(item)}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <img src="/mdi_recent.svg" alt="Recent" width={20} height={20} />
                            </div>
                            <span className="text-gray-900 truncate">{item}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeRecentSearch(item)
                            }}
                            className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                            aria-label="삭제"
                          >
                            <img
                              src="/search_save_remove.svg"
                              alt="Remove"
                              width={16}
                              height={16}
                            />
                          </button>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
