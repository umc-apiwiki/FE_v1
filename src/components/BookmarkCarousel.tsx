'use client'
import React, { useRef, useState, useEffect } from 'react'

interface BookmarkCarouselProps {
  date: string
  children: React.ReactNode
}

export default function BookmarkCarousel({ date, children }: BookmarkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 핸들의 위치값 (0 ~ 24px 사이)
  const [indicatorX, setIndicatorX] = useState(0)

  // 드래그 상태 관리
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startIndicatorX = useRef(0)

  // ----------------------------------------------------------------------
  // [설정값] 트랙 너비(w-20=80px) - 핸들 너비(w-14=56px) = 이동 가능 거리 24px
  // ----------------------------------------------------------------------
  const MAX_MOVE = 24

  // 1. [스크롤 감지] 컨텐츠를 스크롤하면 핸들 위치 업데이트
  const handleScroll = () => {
    if (!scrollRef.current || isDragging.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll > 0) {
      const ratio = scrollLeft / maxScroll
      setIndicatorX(ratio * MAX_MOVE)
    }
  }

  // 2. [휠 스크롤]
  const onWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  // 3. [드래그 시작] 핸들 잡기
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    startX.current = e.clientX
    startIndicatorX.current = indicatorX

    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 4. [드래그 중] 핸들 이동 & 스크롤 동기화
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return

    const deltaX = e.clientX - startX.current
    let newX = startIndicatorX.current + deltaX

    // 범위 제한 (0 ~ 24px)
    if (newX < 0) newX = 0
    if (newX > MAX_MOVE) newX = MAX_MOVE

    setIndicatorX(newX)

    // 핸들 위치에 맞춰 컨텐츠 스크롤
    const { scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const ratio = newX / MAX_MOVE
    scrollRef.current.scrollLeft = ratio * maxScroll
  }

  // 5. [드래그 종료]
  const handleMouseUp = () => {
    isDragging.current = false
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
    <div className="flex flex-col gap-6 w-full mb-10">
      {/* 날짜 헤더 */}
      <div className="text-sky-900 text-2xl font-medium font-['Pretendard_Variable'] pl-4 lg:pl-0">
        {date}
      </div>

      {/* 가로 스크롤 영역 */}
      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="flex gap-10 overflow-x-auto pb-4 pr-10 px-4 lg:px-0 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* ★ 요청하신 스크롤바 디자인 적용 ★ */}
      <div className="w-full flex justify-center mt-2 pr-10">
        {/* 클릭 영역 확보를 위해 투명 박스로 감쌈 (w-20, h-6) */}
        <div
          className="relative w-20 h-6 flex items-center justify-center cursor-pointer"
          onMouseDown={handleMouseDown} // 여기에 드래그 이벤트 연결
        >
          {/* 님께서 주신 코드 그대로 적용 */}
          <div className="relative w-20 mt-1 pointer-events-none">
            {/* 회색 트랙 */}
            <div className="absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl" />
            {/* 움직이는 브랜드 컬러 바 */}
            <div
              className="absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl z-15 transition-transform duration-100 ease-out"
              style={{ transform: `translateX(${indicatorX}px)` }} // 계산된 위치 적용
            />
          </div>
        </div>
      </div>
    </div>
  )
}
