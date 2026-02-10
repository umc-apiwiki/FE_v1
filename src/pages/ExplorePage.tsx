import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import APICard from '@/components/APICard'
import { MobileAPICard } from '@/components/mobile/MobileAPICard'
import SearchBar from '@/components/HomePage/SearchBar'
import { MobileSearchModal } from '@/components/mobile/MobileSearchModal'
import { MobileFilterModal } from '@/components/mobile/MobileFilterModal'
import FilterModal from '@/components/modal/FilterModal'
import CompareModal from '@/components/modal/CompareModal'
import type { FilterValues } from '@/components/modal/FilterModal'
import { useApiList } from '@/hooks'
import type { ApiListParams, SortOption, ApiPreview } from '@/types/api'
import { usePostFavorite } from '@/hooks/mutations/usePostFavorite'
import { CompareProvider } from '@/context/CompareProvider'
import { useCompare } from '@/hooks/useCompare'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'

import Filter from '@/assets/icons/action/ic_filter.svg'
import ArrowDown from '@/assets/icons/action/ic_arrow_down.svg'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '인기순', value: 'POPULAR' },
  { label: '리뷰순', value: 'MOST_REVIEWED' },
]

const ExplorePageContent = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // 디바이스 감지
  const { isMobile } = useDeviceDetect()

  // 비교 기능
  const {
    compareList,
    isCompareModalOpen,
    pricingData,
    isLoadingPricing,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    openCompareModal,
    closeCompareModal,
  } = useCompare()

  // API 조회 파라미터
  const [params, setParams] = useState<ApiListParams>({
    page: 0,
    size: 16,
    sort: 'LATEST',
    direction: 'DESC',
    q: searchParams.get('q') || undefined,
  })

  // 필터 상태 (FilterModal 초기값 전달용)
  const [filterState, setFilterState] = useState<Partial<FilterValues>>({})

  // API 목록 + 즐겨찾기
  const { data: pageData, isLoading, error, fetchApiList } = useApiList()
  const { mutate: toggleFavorite, isLoading: isToggling } = usePostFavorite()

  // 누적 카드 목록
  const [items, setItems] = useState<ApiPreview[]>([])
  // 마지막 페이지 도달 여부
  const [hasMore, setHasMore] = useState(true)
  // 총 개수 (필터/검색 결과 표시용)
  const [totalElements, setTotalElements] = useState<number | null>(null)
  // 리셋 구분 (검색/필터/정렬 변경 시 true → 교체, 스크롤 시 false → 추가)
  const isResetRef = useRef(true)
  // 이전 API 호출 params 저장 (중복 호출 방지용)
  const prevParamsRef = useRef<string>('')

  // ✅ [수정됨] pageData 수신 시 items 업데이트 (중복 제거 로직 추가)
  useEffect(() => {
    if (!pageData?.content) return

    /* eslint-disable react-hooks/set-state-in-effect */
    if (isResetRef.current) {
      // 검색/필터/정렬 변경 시에는 목록을 아예 교체
      setItems(pageData.content)
    } else {
      // 무한 스크롤 시에는 기존 목록에 추가 (단, 중복된 ID는 제거)
      setItems((prev) => {
        // 1. 기존에 이미 있는 ID들을 Set으로 저장 (빠른 검색용)
        const existingIds = new Set(prev.map((item) => item.apiId))

        // 2. 새로 들어온 데이터 중, 기존에 없는 것만 필터링
        const newItems = pageData.content.filter((item) => !existingIds.has(item.apiId))

        // 3. 기존 목록 뒤에 새로운 아이템만 붙임
        return [...prev, ...newItems]
      })
    }
    setHasMore(!pageData.last)
    setTotalElements(pageData.totalElements)
    /* eslint-enable react-hooks/set-state-in-effect */
    isResetRef.current = false
  }, [pageData])

  // params 변경 시 재조회 (중복 호출 방지)
  useEffect(() => {
    const currentParamsKey = JSON.stringify(params)

    // 이전 호출과 동일한 params인 경우 스킵
    if (prevParamsRef.current === currentParamsKey) {
      return
    }

    prevParamsRef.current = currentParamsKey
    fetchApiList(params)
  }, [params, fetchApiList])

  // 무한 스크롤 IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !error) {
          setParams((prev) => ({ ...prev, page: (prev.page ?? 0) + 1 }))
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isLoading, error, items.length, hasMore])

  // Sort 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // 검색
  const handleSearch = useCallback(
    (q: string) => {
      isResetRef.current = true
      setItems([])
      setHasMore(true)
      setTotalElements(null)
      setParams((prev) => ({ ...prev, q, page: 0 }))

      // URL 쿼리 파라미터 업데이트
      setSearchParams({ q })
    },
    [setSearchParams]
  )

  // 필터 적용
  const handleFilterApply = useCallback((filters: FilterValues) => {
    isResetRef.current = true
    setItems([])
    setHasMore(true)
    setTotalElements(null)
    setFilterState(filters)
    setParams((prev) => ({
      ...prev,
      page: 0,
      pricingTypes: filters.pricingTypes.length === 1 ? filters.pricingTypes[0] : undefined,
      authTypes: filters.authTypes.length === 1 ? filters.authTypes[0] : undefined,
      minRating: filters.minRating ?? undefined,
    }))
  }, [])

  // 정렬 변경
  const handleSortChange = useCallback((sort: SortOption) => {
    isResetRef.current = true
    setItems([])
    setHasMore(true)
    setTotalElements(null)
    setParams((prev) => ({ ...prev, sort, page: 0 }))
    setIsSortOpen(false)
  }, [])

  const handleToggleFavorite = useCallback(
    async (apiId: number) => {
      if (isToggling) return

      const result = await toggleFavorite(apiId)

      // 서버 응답 기준으로 상태 반영
      setItems((prev) =>
        prev.map((item) =>
          item.apiId === apiId ? { ...item, isFavorited: result.isFavorited } : item
        )
      )
    },
    [toggleFavorite, isToggling]
  )

  // 비교 목록 토글
  const handleToggleCompare = useCallback(
    (api: ApiPreview) => {
      if (isInCompare(api.apiId)) {
        removeFromCompare(api.apiId)
      } else {
        addToCompare(api)
      }
    },
    [isInCompare, removeFromCompare, addToCompare]
  )

  const currentSort = SORT_OPTIONS.find((o) => o.value === params.sort) ?? SORT_OPTIONS[0]

  return (
    <>
      <MobileHeader />
      <div className="mt-14 xs:mt-16 md:mt-10 pb-16 xs:pb-20 md:pb-20">
        {/* 모바일 검색 모달 */}
        {isMobile && (
          <MobileSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSearch={handleSearch}
          />
        )}

        {/* 데스크톱 검색바 */}
        {!isMobile && (
          <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} onSearch={handleSearch} />
        )}

        {/* 모바일 검색 버튼 */}
        {isMobile && (
          <div className="px-3 xs:px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-white rounded-[25px] xs:rounded-[30px] shadow-[1px_1px_5px_2px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 hover:border-brand-500/50 transition-all px-4 xs:px-5 py-2.5 xs:py-3 flex items-center gap-2 text-left"
            >
              <span className="text-slate-400 text-xs xs:text-sm sm:text-base font-medium flex-1">
                궁금한 API를 검색해보세요
              </span>
              <img src={SearchLine} alt="Search" width={20} height={20} className="flex-shrink-0" />
            </button>
          </div>
        )}

        <div className="mt-4 xs:mt-6 md:mt-8">
          {/* 카드 개수 및 필터/정렬 */}
          <div className="flex flex-col xs:flex-row whitespace-nowrap justify-between items-start xs:items-center gap-2 xs:gap-0 px-3 xs:px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-28">
            <span className="font-sans text-xs xs:text-sm text-[#B0B0B0]">
              {totalElements !== null ? `${totalElements.toLocaleString()}개` : '-'}
            </span>
            <div className="flex gap-3 xs:gap-4 md:gap-6 font-sans text-base xs:text-lg font-medium text-info-dark">
              {/* 비교하기 버튼 */}
              {compareList.length > 0 && (
                <button
                  type="button"
                  onClick={openCompareModal}
                  className="flex items-center gap-1 xs:gap-2 hover:text-brand-500 transition-colors text-sm xs:text-base"
                >
                  <span>비교하기</span>
                  <span className="text-xs xs:text-sm bg-brand-500 text-white rounded-full w-5 h-5 xs:w-6 xs:h-6 flex items-center justify-center">
                    {compareList.length}
                  </span>
                </button>
              )}
              {/* 필터 */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="flex hover:text-brand-500 text-sm xs:text-base"
              >
                <span>Filters</span>
                <img src={Filter} alt="필터" className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>

              {/* 데스크톱 필터 모달 */}
              {!isMobile && isFilterOpen && (
                <FilterModal
                  onClose={() => setIsFilterOpen(false)}
                  onApply={handleFilterApply}
                  initialFilters={filterState}
                />
              )}

              {/* 모바일 필터 모달 */}
              {isMobile && (
                <MobileFilterModal
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  onApply={handleFilterApply}
                  initialFilters={filterState}
                />
              )}

              {/* 정렬 */}
              <div className="relative" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                  className="flex items-center hover:text-brand-500 text-sm xs:text-base"
                >
                  <span>{currentSort.label}</span>
                  <img
                    src={ArrowDown}
                    alt="정렬"
                    className={`w-5 h-5 xs:w-6 xs:h-6 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-brand-500/20 z-20 min-w-[100px] xs:min-w-[120px]">
                    {SORT_OPTIONS.map(({ label, value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSortChange(value)}
                        className={`block w-full text-left px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm hover:bg-brand-500/10 transition-colors ${
                          params.sort === value ? 'text-brand-500 font-semibold' : 'text-info-dark'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 에러 */}
          {error && !isLoading && (
            <div className="text-center py-12 xs:py-16 md:py-20 text-red-500 font-sans px-4">
              <p className="text-sm xs:text-base">{error}</p>
              <button
                type="button"
                onClick={() => fetchApiList(params)}
                className="mt-3 xs:mt-4 px-4 xs:px-6 py-1.5 xs:py-2 bg-brand-500 text-white rounded-full text-xs xs:text-sm"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 결과 없음 (데이터 수신 후 빈 결과일 때만 표시) */}
          {!isLoading && !error && items.length === 0 && totalElements !== null && (
            <div className="text-center py-12 xs:py-16 md:py-20 text-[#B0B0B0] font-sans px-4">
              <p className="text-base xs:text-lg">검색 결과가 없습니다.</p>
            </div>
          )}

          {/* 카드 그리드 */}
          {items.length > 0 && (
            <div
              className="mt-3 gap-4 xs:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1
              md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
              px-3 xs:px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-28"
            >
              {items.map((api) =>
                isMobile ? (
                  <MobileAPICard key={api.apiId} api={api} />
                ) : (
                  <APICard
                    key={api.apiId}
                    {...api}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    isInCompare={isInCompare(api.apiId)}
                  />
                )
              )}
            </div>
          )}

          {/* 무한 스크롤 감지 영역 (아이템이 있고 더 불러올 수 있을 때만) */}
          {items.length > 0 && hasMore && <div ref={sentinelRef} className="h-1" />}

          {/* 로딩 스피너 */}
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* 비교 모달 */}
        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={closeCompareModal}
          compareList={compareList}
          pricingData={pricingData}
          isLoading={isLoadingPricing}
          onRemove={removeFromCompare}
          onClear={clearCompare}
        />
      </div>
      <MobileBottomNavigation />
    </>
  )
}

// Provider로 감싸서 export
const ExplorePage = () => {
  return (
    <CompareProvider maxCompare={3}>
      <ExplorePageContent />
    </CompareProvider>
  )
}

export default ExplorePage
