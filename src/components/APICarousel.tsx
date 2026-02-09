'use client'
import React, { useRef } from 'react'

interface APICarouselProps {
  title: string
  children: React.ReactNode
}

export default function APICarousel({ title, children }: APICarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const onDragStart = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    startX.current = e.clientX
    startScrollLeft.current = scrollRef.current.scrollLeft

    // eslint-disable-next-line
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
    document.addEventListener('mouseleave', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current
    scrollRef.current.style.scrollBehavior = 'auto'
    scrollRef.current.scrollLeft = startScrollLeft.current - deltaX
  }

  const onDragEnd = () => {
    isDragging.current = false
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'

    // eslint-disable-next-line
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
    document.removeEventListener('mouseleave', onDragEnd)
  }

  return (
    <section className="w-full max-w-[1200px] mb-20 relative px-10">
      <h2 className="text-purple-500 text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-xl">❖</span> {title}
      </h2>

      <div className="relative group/btns">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-sky-500"
        >
          ❮
        </button>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          onMouseDown={onDragStart}
          // ✅ 브라우저 기본 이미지 드래그 방지
          onDragStart={(e) => e.preventDefault()}
          className={`flex overflow-x-auto gap-6 no-scrollbar pb-4 scroll-smooth ${isDragging.current ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-sky-500"
        >
          ❯
        </button>
      </div>
    </section>
  )
}
