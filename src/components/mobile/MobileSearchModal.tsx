/**
 * MobileSearchModal 컴포넌트
 * 모바일 환경에서 검색 모달 표시
 * 로직은 useMobileSearch Hook으로 완전히 분리
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useMobileSearch } from '../../hooks/useMobileSearch'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'
import SearchHistory from '@/assets/icons/common/ic_search_history.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'

type MobileSearchModalProps = {
  isOpen: boolean
  onClose: () => void
  onSearch?: (query: string) => void
}

export const MobileSearchModal = ({ isOpen, onClose, onSearch }: MobileSearchModalProps) => {
  const {
    query,
    recentSearches,
    suggestions,
    modalRef,
    setQuery,
    handleSearch,
    handleKeyPress,
    removeRecentSearch,
  } = useMobileSearch({ isOpen, onClose, onSearch })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-12 xs:pt-14 sm:pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl mx-3 xs:mx-4 bg-white rounded-[25px] xs:rounded-[30px] sm:rounded-[34px] shadow-[1px_1px_5px_2px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 overflow-hidden"
            ref={modalRef}
          >
            {/* 검색바 */}
            <div className="p-3 xs:p-4 sm:p-5">
              <div className="relative">
                <div className="flex items-center gap-2 xs:gap-3 bg-white rounded-[20px] xs:rounded-[25px] px-4 xs:px-5 py-2.5 xs:py-3 border border-brand-500/15">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="궁금한 API를 검색해보세요"
                    className="flex-1 bg-transparent border-none outline-none text-info-darker placeholder:text-slate-400 text-xs xs:text-sm sm:text-base font-medium"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
                    aria-label="검색"
                  >
                    <img src={SearchLine} alt="Search" width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 검색 제안 또는 Recent 섹션 */}
            <div className="max-h-80 xs:max-h-96 overflow-y-auto px-2 xs:px-3 sm:px-4 pb-3 xs:pb-4">
              {query.trim().length >= 1 ? (
                /* 자동완성 제안 */
                <>
                  {suggestions.length > 0 && (
                    <div>
                      <div className="mb-2 xs:mb-3 px-2 xs:px-3">
                        <span className="text-sm xs:text-base font-medium text-brand-800 tracking-[-1px]">
                          추천 API
                        </span>
                      </div>
                      <div className="space-y-1">
                        {suggestions.map((item, idx) => (
                          <button
                            key={`suggestion-${idx}`}
                            className="w-full flex items-center gap-2 xs:gap-3 px-3 xs:px-4 py-2 xs:py-2.5 hover:bg-brand-50 rounded-lg xs:rounded-xl transition-colors text-left"
                            onClick={() => handleSearch(item)}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={SearchLine}
                                alt="Search"
                                width={16}
                                height={16}
                                className="xs:w-5 xs:h-5 opacity-60"
                              />
                            </div>
                            <span className="flex-1 text-info-darker text-xs xs:text-sm sm:text-base font-medium">
                              {item.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                                part.toLowerCase() === query.toLowerCase() ? (
                                  <span key={i} className="font-bold text-brand-500">
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
                  <div>
                    <div className="mb-2 xs:mb-3 px-2 xs:px-3">
                      <span className="text-sm xs:text-base font-medium text-brand-800 tracking-[-1px]">
                        Recent
                      </span>
                    </div>

                    <div className="space-y-1">
                      {recentSearches.map((item, idx) => (
                        <div
                          key={`recent-${idx}`}
                          className="w-full flex items-center justify-between gap-2 xs:gap-3 px-3 xs:px-4 py-2 xs:py-2.5 hover:bg-brand-50 rounded-lg xs:rounded-xl transition-colors text-left cursor-pointer"
                          onClick={() => handleSearch(item)}
                        >
                          <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <img
                                src={SearchHistory}
                                alt="Recent"
                                width={16}
                                height={16}
                                className="xs:w-5 xs:h-5 opacity-60"
                              />
                            </div>
                            <span className="text-info-darker truncate text-xs xs:text-sm sm:text-base font-medium">
                              {item}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeRecentSearch(item)
                            }}
                            className="flex-shrink-0 p-0.5 xs:p-1 hover:opacity-70 transition-opacity"
                            aria-label="삭제"
                          >
                            <img
                              src={Cancel}
                              alt="Remove"
                              width={14}
                              height={14}
                              className="xs:w-4 xs:h-4 opacity-50"
                            />
                          </button>
                        </div>
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
