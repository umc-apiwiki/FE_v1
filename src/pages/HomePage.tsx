import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/HomePage/SearchBar'
import IntroSection from '@/components/HomePage/IntroSection'
import SearchTagSection from '@/components/HomePage/SearchTagSection'
import BottomButtonSection from '@/components/HomePage/BottomButtonSection'
import APICardSmall from '@/components/APICardSmall'
import NewsCard from '@/components/NewsCard'
import type { ApiPreview } from '@/types/api'
import { useApiList } from '@/hooks'

// ... (1. 타겟 설정 및 2. 뉴스 데이터 부분은 기존과 동일하므로 생략하지 않고 전체 포함) ...

interface TargetConfig {
  dbName: string
  localImage: string
  fallbackTitle: string
  mockRating: number
  mockReviews: number
  mockPrice: string
}

const TARGET_POPULAR: TargetConfig[] = [
  {
    dbName: 'Youtube API',
    localImage: '/images/YouTube.svg',
    fallbackTitle: 'YouTube',
    mockRating: 4.8,
    mockReviews: 1240,
    mockPrice: 'Free',
  },
  {
    dbName: 'OpenStreetMap',
    localImage: '/images/OpenStreetMap.svg',
    fallbackTitle: 'OpenStreetMap',
    mockRating: 4.1,
    mockReviews: 850,
    mockPrice: 'Mixed',
  },
  {
    dbName: 'Google Login',
    localImage: '/images/Google Login.svg',
    fallbackTitle: 'Google Login',
    mockRating: 4.7,
    mockReviews: 2100,
    mockPrice: 'Free',
  },
  {
    dbName: 'OpenAI GPT-4',
    localImage: '/images/Open AI.svg',
    fallbackTitle: 'Open AI',
    mockRating: 4.9,
    mockReviews: 3400,
    mockPrice: 'Paid',
  },
  {
    dbName: 'Gmail_Fake',
    localImage: '/images/Gmail.svg',
    fallbackTitle: 'Gmail',
    mockRating: 4.6,
    mockReviews: 540,
    mockPrice: 'Free',
  },
]

const TARGET_SUGGEST: TargetConfig[] = [
  {
    dbName: 'Map_Fake_1',
    localImage: '/images/국토부 2D지도API.svg',
    fallbackTitle: '국토부 2D지도',
    mockRating: 4.3,
    mockReviews: 120,
    mockPrice: 'Free',
  },
  {
    dbName: 'Naver_Fake',
    localImage: '/images/Naver.svg',
    fallbackTitle: 'Naver',
    mockRating: 4.5,
    mockReviews: 890,
    mockPrice: 'Mixed',
  },
  {
    dbName: 'KakaoPay_Fake',
    localImage: '/images/카카오페이.svg',
    fallbackTitle: '카카오페이',
    mockRating: 4.2,
    mockReviews: 320,
    mockPrice: 'Free',
  },
  {
    dbName: 'AWS_Fake',
    localImage: '/images/AWS API.svg',
    fallbackTitle: 'AWS API',
    mockRating: 4.8,
    mockReviews: 1500,
    mockPrice: 'Paid',
  },
  {
    dbName: 'NaverMap_Fake',
    localImage: '/images/네이버지도.svg',
    fallbackTitle: '네이버 지도',
    mockRating: 4.4,
    mockReviews: 670,
    mockPrice: 'Paid',
  },
]

interface NewsData {
  title: string
  publisher: string
  thumb: string
}

const newsItems: NewsData[] = [
  {
    title: '"쿠팡 중국인 피의자, 20년 경력개발자 위 개발자"',
    publisher: '/images/더중앙.svg',
    thumb: '/images/쿠팡 중국인.svg',
  },
  {
    title: 'AI가 코드 짜는 시대, 개발자의 역할은...',
    publisher: '/images/잇월드.svg',
    thumb: '/images/AI.svg',
  },
  {
    title: '"대기업 꿈꾸다 이젠 해외로"',
    publisher: '/images/노컷뉴스.svg',
    thumb: '/images/대기업.svg',
  },
  {
    title: 'NIA-경기도경제과학진흥원, 업무협약',
    publisher: '/images/경북신문.svg',
    thumb: '/images/NIA.svg',
  },
  {
    title: '업스테이지, 일본 AI시장 공략',
    publisher: '/images/더일렉.svg',
    thumb: '/images/업스테이지.svg',
  },
]

// -------------------- 3. ScrollableSection (버그 수정 완료) --------------------
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
  const isDragging = useRef(false)
  const dragTarget = useRef<'handle' | 'content' | null>(null)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const startIndicatorX = useRef(0)

  const MAX_MOVE = 24

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  const handleScroll = () => {
    if (!scrollRef.current || dragTarget.current === 'handle') return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
  }

  const onDragStart = (e: React.MouseEvent, target: 'handle' | 'content') => {
    isDragging.current = true
    dragTarget.current = target
    startX.current = e.clientX
    if (scrollRef.current) startScrollLeft.current = scrollRef.current.scrollLeft
    startIndicatorX.current = indicatorX

    // eslint-disable-next-line
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
    // 마우스가 화면 밖으로 나가버렸을 때를 대비해 mouseleave도 추가
    document.addEventListener('mouseleave', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current

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

  const onDragEnd = () => {
    isDragging.current = false
    dragTarget.current = null
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'

    // eslint-disable-next-line
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
    document.removeEventListener('mouseleave', onDragEnd)
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
        onWheel={handleWheel}
        onMouseDown={(e) => onDragStart(e, 'content')}
        // ✅ [핵심 수정] 브라우저 고유의 이미지 드래그 기능(Ghost Image)을 꺼버립니다.
        // 이제 로고를 잡고 끌어도 "이미지 파일 이동"이 아니라 "스크롤"이 됩니다.
        onDragStart={(e) => e.preventDefault()}
        className={`flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth ${
          isDragging.current && dragTarget.current === 'content' ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {type === 'api'
          ? (data as ApiPreview[]).map((api, index) => (
              <APICardSmall key={api.apiId || index} {...api} />
            ))
          : (data as NewsData[]).map((news, i) => (
              <NewsCard
                key={i}
                title={news.title}
                publisherLogoUrl={news.publisher}
                thumbnailUrl={news.thumb}
              />
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

// -------------------- 4. HomePage Component --------------------

const HomePage = () => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const { data: serverData, fetchApiList } = useApiList()

  useEffect(() => {
    fetchApiList({ sort: 'POPULAR', size: 100 })
  }, [fetchApiList])

  const mergeData = (targets: TargetConfig[], fetchedList: ApiPreview[] = []) => {
    return targets.map((target) => {
      const realData = fetchedList.find((item) => item.name === target.dbName)
      if (realData) {
        return { ...realData, logo: target.localImage }
      }
      return {
        apiId: 0,
        name: target.fallbackTitle,
        summary: '주요 기능을 제공하는 인기 API입니다.',
        avgRating: target.mockRating,
        reviewCount: target.mockReviews,
        viewCounts: target.mockReviews * 150,
        pricingType: target.mockPrice,
        authType: 'API_KEY',
        providerCompany: 'ETC',
        isFavorited: false,
        logo: target.localImage,
      } as unknown as ApiPreview
    })
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
        <ScrollableSection title="Latest News" data={newsItems} type="news" />
        <ScrollableSection
          title="Recent Popular"
          data={mergeData(TARGET_POPULAR, serverData?.content)}
          type="api"
        />
        <ScrollableSection
          title="Suggest API"
          data={mergeData(TARGET_SUGGEST, serverData?.content)}
          type="api"
        />
      </div>
      <BottomButtonSection onClick={toggleView} isExpanded={true} />
    </div>
  )
}

export default HomePage
