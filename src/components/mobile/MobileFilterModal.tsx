/**
 * MobileFilterModal 컴포넌트
 * 모바일 환경에서 필터 모달 표시
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import PriceFilter from '../filter/PriceFilter'
import RatingFilter from '../filter/RatingFilter'
import AuthFilter from '../filter/AuthFilter'
import DocsFilter from '../filter/DocsFilter'
import type { PricingType, AuthType } from '@/types/api'

export type FilterValues = {
  pricingTypes: PricingType[]
  authTypes: AuthType[]
  minRating: number | null
  docs: string[]
}

type MobileFilterModalProps = {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
}

const MENUS = [
  { key: 'A', label: '가격' },
  { key: 'B', label: '평점' },
  { key: 'C', label: 'API 인증' },
  { key: 'D', label: '제공 문서' },
] as const

export const MobileFilterModal = ({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: MobileFilterModalProps) => {
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const [filters, setFilters] = useState<FilterValues>({
    pricingTypes: initialFilters?.pricingTypes ?? [],
    authTypes: initialFilters?.authTypes ?? [],
    minRating: initialFilters?.minRating ?? null,
    docs: initialFilters?.docs ?? [],
  })

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      pricingTypes: [],
      authTypes: [],
      minRating: null,
      docs: [],
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-h-[85vh] bg-white rounded-t-[20px] xs:rounded-t-[25px] shadow-lg overflow-hidden flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 xs:px-5 py-3 xs:py-4 border-b border-gray-200">
              <h2 className="text-lg xs:text-xl font-sans font-medium text-brand-800">Filters</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="닫기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex border-b border-gray-200 px-2 xs:px-3 overflow-x-auto scrollbar-hide">
              {MENUS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveMenu(key)}
                  className={`flex-shrink-0 px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base font-medium transition-colors whitespace-nowrap ${
                    activeMenu === key
                      ? 'text-brand-500 border-b-2 border-brand-500'
                      : 'text-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 필터 내용 */}
            <div className="flex-1 overflow-y-auto px-4 xs:px-5 py-4 xs:py-5">
              {activeMenu === 'A' && (
                <PriceFilter
                  value={filters.pricingTypes}
                  onChange={(next) => setFilters((prev) => ({ ...prev, pricingTypes: next }))}
                />
              )}

              {activeMenu === 'B' && (
                <RatingFilter
                  value={filters.minRating}
                  onChange={(next) => setFilters((prev) => ({ ...prev, minRating: next }))}
                />
              )}

              {activeMenu === 'C' && (
                <AuthFilter
                  value={filters.authTypes}
                  onChange={(next) => setFilters((prev) => ({ ...prev, authTypes: next }))}
                />
              )}

              {activeMenu === 'D' && (
                <DocsFilter
                  value={filters.docs}
                  onChange={(next) => setFilters((prev) => ({ ...prev, docs: next }))}
                />
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="px-4 xs:px-5 py-3 xs:py-4 border-t border-gray-200 bg-white flex gap-2 xs:gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 xs:py-3 rounded-[20px] xs:rounded-[25px] border border-brand-500/25 text-brand-500 font-medium text-sm xs:text-base hover:bg-brand-50 transition-colors"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 px-4 py-2.5 xs:py-3 rounded-[20px] xs:rounded-[25px] bg-brand-500 text-white font-medium text-sm xs:text-base hover:bg-brand-600 transition-colors shadow-[1px_1px_5px_1px_var(--tw-shadow-color)] shadow-brand-500/20"
              >
                필터 적용
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
