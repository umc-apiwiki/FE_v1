import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import APICard from '@/components/APICard'
import SearchBar from '@/components/HomePage/SearchBar'
import FilterModal from '@/components/modal/FilterModal'
import type { FilterValues } from '@/components/modal/FilterModal'
import { useApiList } from '@/hooks'
import type { ApiListParams, SortOption, ApiPreview } from '@/types/api'
import { usePostFavorite } from '@/hooks/mutations/usePostFavorite'

import Filter from '@/assets/icons/action/ic_filter.svg'
import ArrowDown from '@/assets/icons/action/ic_arrow_down.svg'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '인기순', value: 'POPULAR' },
  { label: '리뷰순', value: 'MOST_REVIEWED' },
]

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

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

  // pageData 수신 시 items 업데이트 (무한 스크롤 누적)
  useEffect(() => {
    if (!pageData?.content) return

    /* eslint-disable react-hooks/set-state-in-effect */
    if (isResetRef.current) {
      // 검색/필터/정렬 변경 → 교체
      setItems(pageData.content)
    } else {
      // 무한 스크롤 → 기존 목록에 추가
      setItems((prev) => [...prev, ...pageData.content])
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

  const currentSort = SORT_OPTIONS.find((o) => o.value === params.sort) ?? SORT_OPTIONS[0]

  return (
    <div className="mt-10">
      <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} onSearch={handleSearch} />

      <div className="mt-8">
        {/* 카드 개수 및 필터/정렬 */}
        <div className="flex whitespace-nowrap justify-between sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32">
          <span className="font-sans text-sm text-[#B0B0B0]">
            {totalElements !== null ? `${totalElements.toLocaleString()}개` : '-'}
          </span>
          <div className="flex gap-6 sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32 font-sans text-lg font-medium text-info-dark">
            {/* 필터 */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex hover:text-brand-500"
            >
              <span>Filters</span>
              <img src={Filter} alt="필터" />
            </button>
            {isFilterOpen && (
              <FilterModal
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
                className="flex items-center hover:text-brand-500"
              >
                <span>{currentSort.label}</span>
                <img
                  src={ArrowDown}
                  alt="정렬"
                  className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-brand-500/20 z-20 min-w-[120px]">
                  {SORT_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSortChange(value)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-500/10 transition-colors ${
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
          <div className="text-center py-20 text-red-500 font-sans">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchApiList(params)}
              className="mt-4 px-6 py-2 bg-brand-500 text-white rounded-full text-sm"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 결과 없음 (데이터 수신 후 빈 결과일 때만 표시) */}
        {!isLoading && !error && items.length === 0 && totalElements !== null && (
          <div className="text-center py-20 text-[#B0B0B0] font-sans">
            <p className="text-lg">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* 카드 그리드 */}
        {items.length > 0 && (
          <div
            className="mt-3 gap-10 grid grid-cols-1
              sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
              sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32
              sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32"
          >
            {items.map((api) => (
              <APICard key={api.apiId} {...api} onToggleFavorite={handleToggleFavorite} />
            ))}
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
    </div>
  )
}

export default ExplorePage
