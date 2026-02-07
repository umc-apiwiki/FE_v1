import { useRef, useEffect, useState, useMemo } from 'react'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'
import SearchHistory from '@/assets/icons/common/ic_search_history.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'
import { getSearchHistory, addSearchHistory, removeSearchHistory } from '@/utils/searchHistory'
import { getApiList } from '@/services/explore'

type SearchBarProps = {
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isMain?: boolean
  onSearch?: (query: string) => void
}

// Debounce 훅
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchBar({ isOpen, setIsOpen, isMain = false, onSearch }: SearchBarProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const controlled = typeof isOpen === 'boolean' && typeof setIsOpen === 'function'
  const openState = controlled ? isOpen : internalOpen
  const setOpen = controlled ? setIsOpen : setInternalOpen
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounce된 검색어
  const debouncedQuery = useDebounce(query, 300)

  // 검색 내역 로드
  useEffect(() => {
    setRecentSearches(getSearchHistory())
  }, [openState])

  // 서버에서 자동완성 데이터 가져오기
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoadingSuggestions(true)
      try {
        const response = await getApiList({ q: debouncedQuery, size: 5 })
        if (response.isSuccess && response.result) {
          const apiNames = response.result.content.map((api) => api.name)
          setSuggestions(apiNames)
        }
      } catch (error) {
        console.error('자동완성 조회 실패:', error)
        setSuggestions([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    }

    fetchSuggestions()
  }, [debouncedQuery])

  // 최근 검색어 필터링
  const filteredRecent = useMemo(() => {
    if (!query.trim()) return recentSearches
    return recentSearches.filter((text) => text.toLowerCase().includes(query.toLowerCase()))
  }, [query, recentSearches])

  // 표시할 항목: 서버 결과가 있으면 서버 결과, 없으면 최근 검색어
  const displayItems = query.trim() && query.length >= 2 ? suggestions : filteredRecent

  const handleSearch = () => {
    if (query.trim()) {
      addSearchHistory(query.trim())
      onSearch?.(query.trim())
      setQuery('')
      setOpen(false)
      setRecentSearches(getSearchHistory())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleItemClick = (text: string) => {
    setQuery(text)
    addSearchHistory(text)
    onSearch?.(text)
    setQuery('')
    setOpen(false)
    setSuggestions([])
  }

  const handleRemoveHistory = (e: React.MouseEvent, text: string) => {
    e.stopPropagation()
    removeSearchHistory(text)
    setRecentSearches(getSearchHistory())
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpen])

  return (
    <div className="relative mx-auto w-[876px] h-14">
      <div
        ref={containerRef}
        className={`
          bg-white overflow-hidden transition-all duration-300 ease-in-out
          shadow-[1px_1px_5px_2px_var(--tw-shadow-color)] shadow-brand-500/25 border-brand-500/25
          ${
            isMain
              ? `
                fixed left-1/2 -translate-x-1/2
                transition-all duration-300 ease-in-out
                ${
                  openState
                    ? 'top-1/2 -translate-y-1/2 w-[876px] h-[500px] z-50'
                    : 'top-[60%] -translate-y-1/2 w-[876px] h-14 z-30'
                }
                rounded-[34px] border
              `
              : `
                absolute top-0 left-0 w-full
                rounded-[34px] border z-30
                ${openState ? 'h-[500px]' : 'h-14'}
              `
          }

        `}
      >
        <div className="h-14 w-full flex items-center px-[30px] relative shrink-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full text-lg text-info-darker font-medium font-sans placeholder:text-slate-400 outline-none bg-transparent ml-1"
            placeholder="궁금한 API를 검색해보세요"
            onFocus={() => setOpen(true)}
          />

          <div className="w-6 h-6 flex items-center justify-center cursor-pointer ml-4">
            <button type="button" onClick={handleSearch}>
              <img src={SearchLine} alt="검색" />
            </button>
          </div>
        </div>

        <div
          className={`w-full p-2 px-[10px] flex flex-col gap-1 transition-opacity duration-300 ${openState ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="font-sans font-medium text-lg text-brand-800 tracking-[-1px] px-[20px] p-0">
            {query.trim() && query.length >= 2 ? '추천 API' : 'Recent'}
          </span>

          {isLoadingSuggestions ? (
            <div className="px-[20px] py-4 text-center text-slate-400 text-sm font-sans flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              검색 중...
            </div>
          ) : displayItems.length === 0 ? (
            <div className="px-[20px] py-4 text-center text-slate-400 text-sm font-sans">
              {query.trim() && query.length >= 2
                ? '검색 결과가 없습니다'
                : query.trim() && query.length < 2
                  ? '2글자 이상 입력해주세요'
                  : '최근 검색 내역이 없습니다'}
            </div>
          ) : (
            displayItems.map((text, index) => {
              const isRecent = !query.trim() || query.length < 2 || filteredRecent.includes(text)
              return (
                <div
                  key={index}
                  onClick={() => handleItemClick(text)}
                  className="group relative w-full h-14 flex items-center px-[20px] cursor-pointer transition-all duration-200
            hover:bg-brand-500/10 hover:rounded-[30px] hover:rounded-br-[30px]"
                >
                  <div className="w-6 h-6 flex items-center justify-center mr-4">
                    <img src={SearchHistory} alt={isRecent ? '최근 기록' : '추천'} />
                  </div>

                  <span className="text-info-darker text-lg font-medium font-sans flex-1">
                    {query.trim() && query.length >= 2 ? (
                      <>
                        {text.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                          part.toLowerCase() === query.toLowerCase() ? (
                            <span key={i} className="text-brand-500 font-semibold">
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </>
                    ) : (
                      text
                    )}
                  </span>

                  {isRecent && (
                    <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={(e) => handleRemoveHistory(e, text)}>
                        <img src={Cancel} alt="삭제" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
