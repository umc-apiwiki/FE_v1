/**
 * MobileSearchModal 전용 Custom Hook
 * 검색 로직, 최근 검색어, 자동완성 제안 처리
 */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchApiSuggestions } from '../services/mobile'

const RECENT_SEARCHES_KEY = 'recent_searches'
const MAX_RECENT_SEARCHES = 5

type UseMobileSearchProps = {
  isOpen: boolean
  onClose: () => void
  onSearch?: (query: string) => void
}

type UseMobileSearchReturn = {
  query: string
  recentSearches: string[]
  suggestions: string[]
  modalRef: React.RefObject<HTMLDivElement | null>
  setQuery: (query: string) => void
  handleSearch: (searchTerm?: string) => void
  handleKeyPress: (e: React.KeyboardEvent) => void
  removeRecentSearch: (searchTerm: string) => void
}

export const useMobileSearch = ({
  isOpen,
  onClose,
  onSearch,
}: UseMobileSearchProps): UseMobileSearchReturn => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement | null>(null)

  // 최근 검색어 초기화 (초기 데이터로 설정)
  const getInitialRecentSearches = (): string[] => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          return parsed
        }
      } catch (error) {
        console.error('Failed to parse recent searches:', error)
      }
    }
    return []
  }

  const [recentSearches, setRecentSearches] = useState<string[]>(getInitialRecentSearches)

  // 자동완성 제안 페칭 (debounce 적용)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.trim().length < 1) {
        setSuggestions([])
        return
      }

      try {
        const results = await searchApiSuggestions(query, 5)
        setSuggestions(results)
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
        setSuggestions([])
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  // 뒤로가기 감지 및 하단 네비게이션 숨김
  useEffect(() => {
    if (!isOpen) return

    document.body.classList.add('hide-mobile-nav')

    const handlePopState = () => {
      onClose()
    }

    window.history.pushState({ modalOpen: true }, '')
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.body.classList.remove('hide-mobile-nav')
    }
  }, [isOpen, onClose])
  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // 클릭 이벤트 리스너를 다음 틀에 추가하여 모달이 열린 후에 바로 닫히지 않도록 함
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  // 맨 위에서 pull-down 동작 감지
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    let startY = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      if (!modalRef.current) return
      const scrollTop = modalRef.current.scrollTop

      if (scrollTop === 0) {
        startY = e.touches[0].clientY
        isDragging = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !modalRef.current) return

      const scrollTop = modalRef.current.scrollTop
      const currentY = e.touches[0].clientY
      const deltaY = currentY - startY

      if (scrollTop === 0 && deltaY > 50) {
        onClose()
        isDragging = false
      }
    }

    const handleTouchEnd = () => {
      isDragging = false
      startY = 0
    }

    const modalElement = modalRef.current
    modalElement.addEventListener('touchstart', handleTouchStart)
    modalElement.addEventListener('touchmove', handleTouchMove)
    modalElement.addEventListener('touchend', handleTouchEnd)

    return () => {
      modalElement.removeEventListener('touchstart', handleTouchStart)
      modalElement.removeEventListener('touchmove', handleTouchMove)
      modalElement.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isOpen, onClose])

  // 최근 검색어 저장
  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return

    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(
      0,
      MAX_RECENT_SEARCHES
    )

    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  // 검색 실행
  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm || query
    if (term.trim()) {
      saveRecentSearch(term.trim())

      // 커스텀 onSearch 콜백이 있으면 사용, 없으면 기본 네비게이션
      if (onSearch) {
        onSearch(term.trim())
      } else {
        navigate(`/explore?q=${encodeURIComponent(term)}`)
      }
    } else {
      if (onSearch) {
        onSearch('')
      } else {
        navigate('/explore')
      }
    }
    onClose()
  }

  // 엔터 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // 최근 검색어 삭제
  const removeRecentSearch = (searchTerm: string) => {
    const updated = recentSearches.filter((s) => s !== searchTerm)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  return {
    query,
    recentSearches,
    suggestions,
    modalRef,
    setQuery,
    handleSearch,
    handleKeyPress,
    removeRecentSearch,
  }
}
