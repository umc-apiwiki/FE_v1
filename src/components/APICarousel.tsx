'use client';
import React, { useRef } from 'react';

interface APICarouselProps {
  title: string;
  children: React.ReactNode;
}

export default function APICarousel({ title, children }: APICarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1200px] mb-20 relative px-10">
      <h2 className="text-purple-500 text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-xl">❖</span> {title}
      </h2>

      <div className="relative group/btns">
        {/* 화살표 버튼 */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-sky-500"
        >
          ❮
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 no-scrollbar pb-4 scroll-smooth"
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
  );
}
