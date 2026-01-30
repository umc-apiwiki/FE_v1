import APICard from '@/components/APICard'
import SearchBar from '@/components/HomePage/SearchBar'
import Filter from '@/assets/icons/action/ic_filter.svg'
import ArrowDown from '@/assets/icons/action/ic_arrow_down.svg'

import { useState } from 'react'
import FilterModal from '@/components/FilterModal'
import { apiData } from '@/data/mockData'

const ExplorePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="mt-10">
      <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      {/* 카드 영역 */}
      <div className="mt-8">
        {/* 카드 개수 및 필터 */}
        <div className="flex whitespace-nowrap justify-between sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32">
          <span className="font-sans text-sm text-[#B0B0B0]">1,022개</span>
          <div className="flex gap-6 sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32 font-sans text-lg font-medium text-[#0D3C61]">
            {/* Hide Filters */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex hover:text-brand-500"
            >
              <span>Hide Filters</span>
              <img src={Filter} alt="필터" />
            </button>
            {isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
            {/* Sort By */}
            <div className="flex">
              <span>Sort By</span>
              <img src={ArrowDown} alt="정렬" />
            </div>
          </div>
        </div>
        <div
          className="mt-3 gap-10 grid grid-cols-1 
            sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
            sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32
            sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32"
        >
          {apiData.map((data) => (
            <APICard key={data.id} {...data} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
