import { useState } from 'react'
import Modal from '../modal/Modal'
import PriceFilter from '../filter/PriceFilter'
import RatingFilter from '../filter/RatingFilter'
import ProviderFilter from '../filter/ProviderFilter'
import ModalButton from './components/ModalButton'
import type { PricingType, ProviderCompany } from '@/types/api'

export type FilterValues = {
  pricingTypes: PricingType | null
  providers: ProviderCompany | null
  minRating: number | null
}

type FilterModalProps = {
  onClose: () => void
  onApply: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
}

const MENUS = [
  { key: 'A', label: '가격' },
  { key: 'B', label: '평점' },
  { key: 'C', label: '제공사' },
] as const

export default function FilterModal({ onClose, onApply, initialFilters }: FilterModalProps) {
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C'>('A')
  const [filters, setFilters] = useState<FilterValues>({
    pricingTypes: initialFilters?.pricingTypes ?? null,
    providers: initialFilters?.providers ?? null,
    minRating: initialFilters?.minRating ?? null,
  })

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <Modal onClose={onClose} width="w-[520px]" height="h-[680px]">
      <div className="flex flex-col h-full p-8">
        <div className="font-sans text-xl font-medium pb-5">
          <span>Filters</span>
        </div>
        {/* 메뉴 */}
        <div className="flex gap-6 text-lg font-sans font-medium pb-6">
          {MENUS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMenu(key)}
              className={`relative pb-3 text-lg transition-colors ${activeMenu === key ? 'text-[#0D3C61]' : 'text-[#B0B0B0]'}`}
            >
              {label}
              {activeMenu === key && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-[1px] bg-[#0D3C61]/80" />
              )}
            </button>
          ))}
        </div>
        {/* 내용물 */}
        <div className="flex-1 overflow-y-auto pr-2">
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
            <ProviderFilter
              value={filters.providers}
              onChange={(next) => setFilters((prev) => ({ ...prev, providers: next }))}
            />
          )}
        </div>
        {/* 필터 적용 버튼 */}
        <div className="pt-6 flex justify-center">
          <ModalButton onClick={handleApply}>필터 적용</ModalButton>
        </div>
      </div>
    </Modal>
  )
}
