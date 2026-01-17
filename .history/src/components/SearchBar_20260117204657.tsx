import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 보내주신 검색어 데이터 4개
  const recentSearches = [
    'AWS API',
    '네이버지도 API',
    '강아지 앱 API',
    '게임 앱 API',
  ];

  // 외부 클릭 시 닫기 기능
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
      // 1. 전체 컨테이너: Figma의 w-[918px] 반영
      className={`
        relative mx-auto bg-white transition-all duration-300 ease-in-out z-50 overflow-hidden
        w-[918px] border border-sky-500 box-border
        ${
          isOpen
            ? 'h-[340px] rounded-[5px] shadow-lg' // 열렸을 때
            : 'h-14 rounded-[5px]' // 닫혔을 때 (기본 높이)
        }
      `}
    >
      {/* 2. 상단 입력창 영역 (내부 w-[878px]로 중앙 정렬) */}
      <div className="h-14 w-[878px] mx-auto flex items-center relative shrink-0">
        {/* [로고 아이콘 자리] - Figma의 left-[26px] 위치 반영 */}
        <div className="absolute left-[6px] top-[16px] w-6 h-6 overflow-hidden">
          {/* 검은색 네모 (추후 아이콘으로 교체하세요) */}
          <div className="w-5 h-4 bg-black absolute left-[1px] top-[3px]" />
        </div>

        {/* 입력창 - Figma의 left-[60px] 텍스트 위치 반영 */}
        <input
          type="text"
          className="w-full h-full pl-[40px] text-lg text-slate-900 font-medium font-['Pretendard_Variable'] placeholder:text-slate-400 outline-none bg-transparent"
          placeholder="검색어를 입력하세요"
          onFocus={() => setIsOpen(true)}
        />

        {/* [돋보기 아이콘 자리] - 우측 끝 */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer">
          <div className="w-5 h-5 bg-black/20 rounded-full" />{' '}
          {/* 임시 아이콘 */}
        </div>
      </div>

      {/* 3. 하단 검색 기록 리스트 (열렸을 때만 보임) */}
      <div
        className={`w-[878px] mx-auto pt-2 pb-4 flex flex-col gap-1 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {recentSearches.map((text, index) => (
          <div
            key={index}
            // 4. 리스트 아이템 스타일 (여기가 핵심!)
            className="group relative w-full h-14 flex items-center cursor-pointer transition-all duration-200
            hover:bg-sky-500/10 hover:rounded-tr-3xl hover:rounded-br-3xl"
          >
            {/* 시계 아이콘 (왼쪽) */}
            <div className="absolute left-[6px] w-6 h-6 overflow-hidden">
              <div className="w-5 h-4 bg-black absolute left-[1px] top-[3px]" />
            </div>

            {/* 텍스트 */}
            <span className="absolute left-[40px] text-slate-900 text-lg font-medium font-['Pretendard_Variable']">
              {text}
            </span>

            {/* X 버튼 (오른쪽) - Hover 시에만 등장 */}
            <div className="absolute right-[20px] w-6 h-6 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 bg-black absolute left-[2px] top-[2px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
