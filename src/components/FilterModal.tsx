import { useEffect, useState } from 'react'
import PriceFilter from './FilterModal/PriceFilter'
import RatingFilter from './FilterModal/RatingFilter'
import AuthFilter from './FilterModal/AuthFilter'
import DocsFilter from './FilterModal/DocsFilter'

type Filters = {
  price: string[]
  rating: number[]
  auth: string[]
  docs: string[]
}

type FilterModalProps = {
  onClose: () => void
}

export default function FilterModal({ onClose }: FilterModalProps) {
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const MENUS = [
    { key: 'A', label: '가격' },
    { key: 'B', label: '평점' },
    { key: 'C', label: 'API 인증 방식' },
    { key: 'D', label: '제공 문서' },
  ] as const
  const [filters, setFilters] = useState<Filters>({
    price: [],
    rating: [],
    auth: [],
    docs: [],
  })
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 뒷배경 블러 처리 */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      {/* 카드 배경 */}
      <div className="relative w-[390px] h-[660px] z-50 rounded-[25px] border-brand-500/60 border-thin bg-white shadow-[1px_1px_10px_2px_var(--tw-shadow-color)] shadow-brand-500/25">
        {/* 컨텐츠 */}
        <div className="m-8">
          {/* Filters */}
          <div className="font-sans text-xl font-medium pb-5">
            <span>Filters</span>
          </div>
          {/* 메뉴 */}
          <div className="flex gap-6 text-lg font-sans font-medium pb-6 m-2">
            {MENUS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMenu(key)}
                className={`
                                relative pb-3 text-lg transition-colors
                                ${activeMenu === key ? 'text-[#0D3C61]' : 'text-[#B0B0B0]'}
                            `}
              >
                {label}
                {activeMenu === key && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-[1px] bg-[#0D3C61]/80" />
                )}
              </button>
            ))}
          </div>
          {/* 내용물 */}
          <div className="m-2">
            {activeMenu === 'A' && (
              <PriceFilter
                value={filters.price}
                onChange={(next) => setFilters((prev) => ({ ...prev, price: next }))}
              />
            )}

            {activeMenu === 'B' && (
              <RatingFilter
                value={filters.rating}
                onChange={(next) => setFilters((prev) => ({ ...prev, rating: next }))}
              />
            )}

            {activeMenu === 'C' && (
              <AuthFilter
                value={filters.auth}
                onChange={(next) => setFilters((prev) => ({ ...prev, auth: next }))}
              />
            )}

            {activeMenu === 'D' && (
              <DocsFilter
                value={filters.docs}
                onChange={(next) => setFilters((prev) => ({ ...prev, docs: next }))}
              />
            )}
          </div>
          {/* 필터 적용 버튼 */}
          <div className="absolute bottom-14 w-[308px] h-[55px] rounded-[30px] border-[#E0E0E9] overflow-hidden cursor-pointer">
            <div className="w-full h-full bg-brand-500 flex items-center justify-center">
              <span className="text-white text-lg font-medium font-s pb-1">필터 적용</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
