import { useState, useRef, useEffect } from 'react'
import SearchBar from '@/components/HomePage/SearchBar'
import IntroSection from '@/components/HomePage/IntroSection'
import SearchTagSection from '@/components/HomePage/SearchTagSection'
import BottomButtonSection from '@/components/HomePage/BottomButtonSection'
import APICardSmall from '@/components/APICardSmall'
import NewsCard from '@/components/NewsCard'

// -------------------- 1. 데이터 정의 --------------------
interface APIData {
  id: number
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
}
interface NewsData {
  title: string
  publisher: string
  thumb: string
}

const popularAPIs: APIData[] = [
  {
    id: 1,
    title: 'Youtube',
    star: '4.8',
    usedBy: '1.2B people',
    price: 'Free',
    iconUrl: '/images/YouTube.svg',
  },
  {
    id: 2,
    title: 'OpenStreetMap',
    star: '4.1',
    usedBy: '760M people',
    price: 'Mixed',
    iconUrl: '/images/OpenStreetMap.svg',
  },
  {
    id: 3,
    title: 'Google Login',
    star: '4.7',
    usedBy: '2.1B people',
    price: 'Free',
    iconUrl: '/images/Google Login.svg',
  },
  {
    id: 4,
    title: 'Open AI',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: '/images/Open AI.svg',
  },
  {
    id: 5,
    title: 'Gmail',
    star: '4.9',
    usedBy: '45M people',
    price: 'Free',
    iconUrl: '/images/Gmail.svg',
  },
]
const suggestAPIs: APIData[] = [
  {
    id: 6,
    title: '국토부 2D지도API',
    star: '4.8',
    usedBy: '1.2B people',
    price: 'Free',
    iconUrl: '/images/국토부 2D지도API.svg',
  },
  {
    id: 7,
    title: 'Naver',
    star: '4.3',
    usedBy: '820M people',
    price: 'Mixed',
    iconUrl: '/images/Naver.svg',
  },
  {
    id: 8,
    title: '카카오페이',
    star: '3.6',
    usedBy: '120M people',
    price: 'Free',
    iconUrl: '/images/카카오페이.svg',
  },
  {
    id: 9,
    title: 'AWS API',
    star: '4.8',
    usedBy: '990M people',
    price: 'Paid',
    iconUrl: '/images/AWS API.svg',
  },
  {
    id: 10,
    title: '네이버 지도',
    star: '3.7',
    usedBy: '34M people',
    price: 'Paid',
    iconUrl: '/images/네이버지도.svg',
  },
]
const newsItems: NewsData[] = [
  {
    title: '"쿠팡 중국인 피의자, 20년 경력개발자 위 개발자"',
    publisher: 'https://placehold.co/96x14',
    thumb: 'https://placehold.co/310x150',
  },
  {
    title: 'AI가 코드 짜는 시대, 개발자의 역할은...',
    publisher: 'https://placehold.co/43x14',
    thumb: 'https://placehold.co/310x150',
  },
  {
    title: '"대기업 꿈꾸다 이젠 해외로"',
    publisher: 'https://placehold.co/36x20',
    thumb: 'https://placehold.co/310x150',
  },
  {
    title: 'NIA-경기도경제과학진흥원, 업무협약',
    publisher: 'https://placehold.co/64x14',
    thumb: 'https://placehold.co/310x150',
  },
  {
    title: '업스테이지, 일본 AI시장 공략',
    publisher: 'https://placehold.co/107x14',
    thumb: 'https://placehold.co/310x150',
  },
]

// -------------------- 2. ScrollableSection --------------------
const ScrollableSection = ({
  title,
  data,
  type,
}: {
  title: string
  data: APIData[] | NewsData[]
  type: 'api' | 'news'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indicatorX, setIndicatorX] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startIndicatorX = useRef(0)
  const MAX_MOVE = 24

  const handleScroll = () => {
    if (!scrollRef.current || isDragging.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
  }
  const onWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    startX.current = e.clientX
    startIndicatorX.current = indicatorX
    // eslint-disable-next-line
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current
    let newX = startIndicatorX.current + deltaX
    if (newX < 0) newX = 0
    if (newX > MAX_MOVE) newX = MAX_MOVE
    setIndicatorX(newX)
    const { scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    scrollRef.current.scrollLeft = (newX / MAX_MOVE) * maxScroll
  }
  const handleMouseUp = () => {
    isDragging.current = false
    // eslint-disable-next-line
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="w-full max-w-[1444px] mx-auto flex flex-col mb-12 animate-fade-in px-4">
      <div className="w-full mb-6">
        <div className="justify-start text-black/60 text-2xl font-medium font-['Pretendard_Variable']">
          {title}
        </div>
      </div>
      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {type === 'api'
          ? (data as APIData[]).map((api) => <APICardSmall key={api.id} {...api} />)
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
          className="relative w-20 h-6 flex items-center justify-center cursor-pointer touch-none"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-0 z-20" />
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const toggleView = () => {
    setShowMore((prev) => !prev)
    // 리스트 화면에서 홈으로 돌아갈 때만 스크롤 초기화
    if (showMore) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showMore) {
    return (
      // 홈화면
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-8">
          {/* 로고와 소개글*/}
          {!isSearchOpen && <IntroSection />}

          {/* 검색창*/}
          <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} isMain={true} />

          {/* 태그 컴포넌트*/}
          {!isSearchOpen && <SearchTagSection />}
        </div>

        {/* 하단 버튼*/}
        {!isSearchOpen && <BottomButtonSection onClick={toggleView} isExpanded={false} />}
      </div>
    )
  }

  // [화면 2] 리스트 화면
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full flex flex-col items-center pt-24 pb-24 animate-slide-up">
        <ScrollableSection title="Latest News" data={newsItems} type="news" />
        <ScrollableSection title="Recent Popular" data={popularAPIs} type="api" />
        <ScrollableSection title="Suggest API" data={suggestAPIs} type="api" />
      </div>

      {/* 하단 버튼 (상단 고정, Down 아이콘) */}
      <BottomButtonSection onClick={toggleView} isExpanded={true} />
    </div>
  )
}

export default HomePage
