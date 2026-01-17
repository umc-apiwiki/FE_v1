import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 영상과 동일한 검색어 예시 데이터
  const recentSearches = [
    { id: 1, text: '지도' },
    { id: 2, text: '카카오' },
    { id: 3, text: '이메일' },
    { id: 4, text: '음식' },
    { id: 5, text: '영오' }, // 영상 속 텍스트 반영
  ];

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        w-full max-w-[800px] bg-white border transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] overflow-hidden relative z-20
        ${
          isOpen
            ? 'border-sky-500 rounded-[30px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] h-[420px]'
            : 'border-gray-200 rounded-full shadow-sm h-[64px]'
        }
      `}
    >
      {/* 1. 상단 입력창 영역 */}
      <div className="h-[64px] w-full flex items-center px-8 relative">
        <input
          type="text"
          className="w-full h-full text-lg text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
          placeholder="궁금한 API를 검색해보세요"
          onFocus={() => setIsOpen(true)}
        />

        {/* 우측 돋보기 아이콘 (SVG) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center pointer-events-none">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${
              isOpen ? 'text-sky-500' : 'text-slate-400'
            }`}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* 2. 하단 검색 기록 영역 (높이 애니메이션과 함께 나타남) */}
      <div
        className={`px-8 pb-6 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 delay-100' : 'opacity-0'
        }`}
      >
        {/* 헤더: Recent / 모두 지우기 */}
        <div className="flex justify-between items-center mt-2 mb-4">
          <span className="text-sky-500 font-semibold text-sm">Recent</span>
          <button className="text-slate-400 text-xs hover:text-slate-600 transition-colors">
            모두 지우기
          </button>
        </div>

        {/* 리스트 아이템들 */}
        <div className="flex flex-col gap-1">
          {recentSearches.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 px-2 -mx-2 hover:bg-slate-50 rounded-xl cursor-pointer group/item transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* 시계 아이콘 */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-slate-700 text-base">{item.text}</span>
              </div>

              {/* 삭제(X) 버튼 - 호버 시 표시 */}
              <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
