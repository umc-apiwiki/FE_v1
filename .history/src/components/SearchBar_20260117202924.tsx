import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 보내주신 4가지 검색어 데이터
  const recentSearches = [
    'AWS API',
    '네이버지도 API',
    '강아지 앱 API',
    '게임 앱 API',
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
        relative w-full max-w-[918px] bg-white border box-border overflow-hidden transition-all duration-300 ease-in-out z-50
        ${
          isOpen
            ? 'border-purple-500 rounded-[30px] h-[340px] shadow-lg' // 열렸을 때: 보라색 테두리, 높이 커짐
            : 'border-purple-500 rounded-[5px] h-14' // 닫혔을 때: 기본 높이
        }
      `}
    >
      {/* 1. 상단 입력창 */}
      <div className="h-14 w-full flex items-center px-[20px] relative shrink-0">
        <input
          type="text"
          className="w-full h-full text-lg text-slate-900 font-medium placeholder:text-slate-400 outline-none bg-transparent"
          placeholder="검색어를 입력하세요" // 필요 시 변경하세요
          onFocus={() => setIsOpen(true)}
        />

        {/* 돋보기 아이콘 (우측) */}
        <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* 2. 하단 검색 기록 리스트 (보내주신 디자인 적용됨) */}
      <div
        className={`px-[20px] pt-2 pb-4 flex flex-col gap-1 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 리스트 아이템 반복 (Map 사용) */}
        {recentSearches.map((text, index) => (
          <div
            key={index}
            className="group relative w-full h-14 flex items-center px-[40px] cursor-pointer transition-all duration-200 
            hover:bg-sky-500/10 hover:rounded-tr-3xl hover:rounded-br-3xl" // 여기가 핵심: 마우스 올리면 하늘색 배경 + 오른쪽만 둥글게
          >
            {/* 시계 아이콘 (왼쪽) */}
            <div className="absolute left-0 w-6 h-6 flex items-center justify-center">
              <div className="w-5 h-4 bg-black/20" />{' '}
              {/* 보내주신 네모 아이콘 대신 실제 아이콘 넣으려면 아래 주석 해제 */}
              {/* <svg width="20" height="20" ... >시계 아이콘 svg</svg> */}
            </div>

            {/* 텍스트 */}
            <span className="text-slate-900 text-lg font-medium font-['Pretendard_Variable']">
              {text}
            </span>

            {/* X 버튼 (오른쪽) - 평소엔 숨김(opacity-0), 마우스 올리면 보임(opacity-100) */}
            <div className="absolute right-4 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 bg-black/20" />{' '}
              {/* 보내주신 네모 아이콘 대신 실제 아이콘 넣으려면 아래 주석 해제 */}
              {/* <svg width="20" height="20" ... >X 아이콘 svg</svg> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
