import CategoryTag from '@/components/CategoryTag'
import ArrowLeft from '@/assets/icons/action/ic_arrow_left.svg'
import ArrowRight from '@/assets/icons/action/ic_arrow_right.svg'
import { useRef, useState } from 'react'

export default function SearchTagSection() {
  const categories = [
    { id: 1, name: '결제' },
    { id: 2, name: '관리' },
    { id: 3, name: '파일' },
    { id: 4, name: '마케팅' },
    { id: 5, name: '지도' },
    { id: 6, name: '이미지' },
    { id: 7, name: '비디오' },
    { id: 8, name: 'SMS' },
    { id: 9, name: 'AI' },
    { id: 10, name: '분석' },
    { id: 11, name: '프로젝트' },
  ]
  const tagScrollRef = useRef<HTMLDivElement | null>(null)
  const [indicatorX, setIndicatorX] = useState(0)

  const SCROLL_AMOUNT = 200

  const handlePrev = () => {
    tagScrollRef.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }

  const handleNext = () => {
    tagScrollRef.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    const el = tagScrollRef.current
    if (!el) return

    const scrollableWidth = el.scrollWidth - el.clientWidth
    const progress = el.scrollLeft / scrollableWidth

    const maxMove = 24 // 회색 바(20) - 초록 바(14) = 6
    setIndicatorX(progress * maxMove)
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex z-10 gap-3">
        <button type="button" onClick={handlePrev}>
          <img src={ArrowLeft} alt="이전" />
        </button>
        <div
          ref={tagScrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-hidden  w-[600px] whitespace-nowrap py-1"
        >
          {categories.map((cat) => (
            <CategoryTag key={cat.id} category={cat} />
          ))}
        </div>
        <button type="button" onClick={handleNext}>
          <img src={ArrowRight} alt="다음" />
        </button>
      </div>

      {/* 라인*/}
      <div className="relative w-20 mt-1">
        <div className="absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl" />
        <div
          className="absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl z-15 transition-transform duration-200"
          style={{ transform: `translateX(${indicatorX}px)` }}
        />
      </div>
    </div>
  )
}
