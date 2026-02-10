/**
 * MobileHomePage 전용 Custom Hook
 * 로직과 뷰를 분리하여 모든 상태 관리 및 비즈니스 로직 처리
 */

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type UseMobileHomeReturn = {
  // 상태
  scrollProgress: number
  isSearchModalOpen: boolean
  categories: string[]
  // Refs
  scrollRef: React.RefObject<HTMLDivElement | null>
  // 핸들러
  handleScroll: () => void
  handleCategoryClick: (category: string) => void
  setIsSearchModalOpen: (isOpen: boolean) => void
}

export const useMobileHome = (): UseMobileHomeReturn => {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [categories] = useState<string[]>([
    '공개',
    '오픈소스',
    '검색',
    '번역',
    'AI',
    '지도',
    '금융',
    '소셜',
  ])

  // 스크롤 진행률 계산
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    navigate(`/explore?category=${encodeURIComponent(category)}`)
  }

  return {
    scrollProgress,
    isSearchModalOpen,
    categories,
    scrollRef,
    handleScroll,
    handleCategoryClick,
    setIsSearchModalOpen,
  }
}
