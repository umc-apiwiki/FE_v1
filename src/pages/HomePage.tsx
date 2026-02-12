import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/HomePage/SearchBar'
import IntroSection from '@/components/HomePage/IntroSection'
import SearchTagSection from '@/components/HomePage/SearchTagSection'
import BottomButtonSection from '@/components/HomePage/BottomButtonSection'
import APICardSmall from '@/components/APICardSmall'
import NewsCard from '@/components/NewsCard'
import { MobileHomePage } from '@/components/mobile'
import type { ApiPreview } from '@/types/api'
import { useApiList, useDeviceDetect } from '@/hooks'

// -------------------- 1. 뉴스 데이터 --------------------
interface NewsData {
  title: string
  publisher: string
  thumb: string
  url: string
}

const newsItems: NewsData[] = [
  {
    title: '"쿠팡 중국인 피의자, 20년 경력개발자 위 개발자"',
    publisher: '/images/더중앙.svg',
    thumb: '/images/쿠팡 중국인.svg',
    url: 'https://www.joongang.co.kr/article/25389999',
  },
  {
    title: 'AI가 코드 짜는 시대, ‘개발자’의 역할과 이름을 다시 ...',
    publisher: '/images/잇월드.svg',
    thumb: '/images/AI.svg',
    url: 'https://www.itworld.co.kr/article/4108350/ai%EA%B0%80-%EC%BD%94%EB%93%9C-%EC%A7%9C%EB%8A%94-%EC%8B%9C%EB%8C%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%97%AD%ED%95%A0%EA%B3%BC-%EC%9D%B4%EB%A6%84%EC%9D%84-%EB%8B%A4%EC%8B%9C.html',
  },
  {
    title: '"대기업 꿈꾸다 이젠 해외로"…영어학원의 IT개발자들',
    publisher: '/images/노컷뉴스.svg',
    thumb: '/images/대기업.svg',
    url: 'https://www.nocutnews.co.kr/news/6445259',
  },
  {
    title: 'NIA-경기도경제과학진흥원, AI 윤리 문화 업무협약',
    publisher: '/images/경북신문.svg',
    thumb: '/images/NIA.svg',
    url: 'https://www.kbsm.net/news/view.php?idx=501103',
  },
  {
    title: "업스테이지, 日 AI시장 '온프레미스'와 'API'로 공략",
    publisher: '/images/더일렉.svg',
    thumb: '/images/업스테이지.svg',
    url: 'https://www.thelec.kr/news/articleView.html?idxno=45364',
  },
]

// -------------------- 2. ScrollableSection --------------------
const ScrollableSection = ({
  title,
  data,
  type,
}: {
  title: string
  data: ApiPreview[] | NewsData[]
  type: 'api' | 'news'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indicatorX, setIndicatorX] = useState(0)

  // 드래그 상태 관리
  const [isDragActive, setIsDragActive] = useState(false)
  const [activeTarget, setActiveTarget] = useState<'handle' | 'content' | null>(null)
  const [hasDragged, setHasDragged] = useState(false) // 렌더링용

  const isDragging = useRef(false)
  const dragTarget = useRef<'handle' | 'content' | null>(null)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const startIndicatorX = useRef(0)
  const hasDraggedRef = useRef(false) // 이벤트 핸들러에서 즉시 사용할 ref
  const clickTimeoutRef = useRef<number | null>(null)

  const MAX_MOVE = 24
  const DRAG_THRESHOLD = 5 // 드래그로 인식하기 위한 최소 이동 거리 (px)

  // [Lint 해결] document.body 직접 수정을 useEffect로 이동
  useEffect(() => {
    if (isDragActive) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
    return () => {
      document.body.style.userSelect = ''
      // 컴포넌트 언마운트 시 타임아웃 정리
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [isDragActive])

  const handleScroll = () => {
    if (!scrollRef.current || dragTarget.current === 'handle') return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
  }

  const onDragStart = (e: React.MouseEvent, target: 'handle' | 'content') => {
    isDragging.current = true
    hasDraggedRef.current = false // ref 초기화
    setHasDragged(false) // state 초기화

    // 기존 타임아웃 취소
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = null
    }

    setIsDragActive(true)
    setActiveTarget(target)
    dragTarget.current = target
    startX.current = e.clientX
    if (scrollRef.current) startScrollLeft.current = scrollRef.current.scrollLeft
    startIndicatorX.current = indicatorX

    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
    document.addEventListener('mouseleave', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current

    // 드래그 threshold 체크: 일정 거리 이상 움직였을 때만 드래그로 인식
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      hasDraggedRef.current = true // ref 즉시 업데이트
      setHasDragged(true) // state도 업데이트
    }

    // 실제 드래그가 발생했을 때만 스크롤 이동
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      if (dragTarget.current === 'handle') {
        const newX = Math.max(0, Math.min(startIndicatorX.current + deltaX, MAX_MOVE))
        setIndicatorX(newX)
        const { scrollWidth, clientWidth } = scrollRef.current
        scrollRef.current.scrollLeft = (newX / MAX_MOVE) * (scrollWidth - clientWidth)
      } else {
        scrollRef.current.style.scrollBehavior = 'auto'
        scrollRef.current.scrollLeft = startScrollLeft.current - deltaX
      }
    }
  }

  const onDragEnd = () => {
    const wasDragging = hasDraggedRef.current

    isDragging.current = false
    setIsDragActive(false)
    setActiveTarget(null)
    dragTarget.current = null
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'

    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
    document.removeEventListener('mouseleave', onDragEnd)

    // 드래그가 발생했다면 클릭 이벤트가 완전히 처리될 때까지 충분한 시간 대기
    if (wasDragging) {
      // ref는 즐시 초기화하지 않고 조금 더 유지
      clickTimeoutRef.current = setTimeout(() => {
        hasDraggedRef.current = false
        setHasDragged(false)
        clickTimeoutRef.current = null
      }, 200) // 100ms에서 200ms로 증가
    } else {
      hasDraggedRef.current = false
      setHasDragged(false)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  if (!data || data.length === 0) return null

  return (
    <div className="w-full max-w-[1444px] mx-auto flex flex-col mb-12 animate-fade-in px-4">
      <div className="w-full mb-6">
        <div className="justify-start text-black/60 text-2xl font-medium font-['Pretendard_Variable']">
          {title}
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={(e) => onDragStart(e, 'content')}
        onClick={(e) => {
          // ref를 사용하여 즉시 체크
          if (hasDraggedRef.current) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        // 이미지 드래그 방지 (중요)
        onDragStart={(e) => e.preventDefault()}
        className={`flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth ${
          activeTarget === 'content' ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {type === 'api'
          ? (data as ApiPreview[]).map((api, index) => (
              <div
                key={`api-${title}-${api.apiId}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[300px]"
                onClick={(e) => {
                  // ref를 사용하여 즉시 체크
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                <APICardSmall {...api} preventClick={hasDragged} />
              </div>
            ))
          : (data as NewsData[]).map((news, i) => (
              <div
                key={`news-${title}-${i}`}
                className="flex-shrink-0"
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                <NewsCard
                  title={news.title}
                  publisherLogoUrl={news.publisher}
                  thumbnailUrl={news.thumb}
                  url={news.url}
                  preventClick={hasDragged}
                />
              </div>
            ))}
      </div>

      <div className="w-full flex justify-center mt-2">
        <div
          className="relative w-20 h-6 flex items-center justify-center cursor-pointer"
          onMouseDown={(e) => onDragStart(e, 'handle')}
        >
          <div className="relative w-20 mt-1 pointer-events-none">
            <div className="absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl" />
            <div
              className="absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl z-15 transition-transform duration-100 ease-out"
              style={{ transform: `translateX(${indicatorX}px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// -------------------- 3. HomePage Component --------------------

const HomePage = () => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  // 인기 API 목록 (POPULAR 정렬)
  const {
    data: popularData,
    fetchApiList: fetchPopularList,
    isLoading: isLoadingPopular,
  } = useApiList()

  // 제안 API 목록 (LATEST 정렬)
  const {
    data: suggestData,
    fetchApiList: fetchSuggestList,
    isLoading: isLoadingSuggest,
  } = useApiList()

  // 디바이스 타입 감지
  const { isMobile } = useDeviceDetect()

  useEffect(() => {
    // 인기 API 가져오기 (인기순 정렬, 최대 10개)
    fetchPopularList({ sort: 'POPULAR', size: 10 })
    // 제안 API 가져오기 (최신순 정렬, 최대 10개)
    fetchSuggestList({ sort: 'LATEST', size: 10 })
  }, [fetchPopularList, fetchSuggestList])

  // 모바일 디바이스에서는 MobileHomePage 렌더링
  if (isMobile) {
    return <MobileHomePage />
  }

  const handleSearch = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`)
  }

  const toggleView = () => {
    setShowMore((prev) => !prev)
    if (showMore) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showMore) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-8">
          {!isSearchOpen && <IntroSection />}
          <SearchBar
            isOpen={isSearchOpen}
            setIsOpen={setIsSearchOpen}
            isMain={true}
            onSearch={handleSearch}
          />
          {!isSearchOpen && <SearchTagSection />}
        </div>
        {!isSearchOpen && <BottomButtonSection onClick={toggleView} isExpanded={false} />}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full flex flex-col items-center pt-24 pb-24 animate-slide-up">
        {/* 뉴스 섹션 */}
        <ScrollableSection title="Latest News" data={newsItems} type="news" />

        {/* Popular API (실제 인기 API) */}
        {!isLoadingPopular && popularData?.content && popularData.content.length > 0 && (
          <ScrollableSection title="Recent Popular" data={popularData.content} type="api" />
        )}

        {/* Suggest API (실제 최신 API) */}
        {!isLoadingSuggest && suggestData?.content && suggestData.content.length > 0 && (
          <ScrollableSection title="Suggest API" data={suggestData.content} type="api" />
        )}
      </div>

      <BottomButtonSection onClick={toggleView} isExpanded={true} />
    </div>
  )
}

export default HomePage
