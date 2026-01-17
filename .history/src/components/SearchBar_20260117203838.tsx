import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 검색어 예시 데이터 (필요하면 수정하세요)
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
      // 보내주신 스타일 적용 완료 (w-[876px], 그림자, 둥글기 등)
      className={`
        relative mx-auto bg-white overflow-hidden transition-all duration-300 ease-in-out z-50
        w-[876px] shadow-[1px_1px_5px_2px_rgba(33,150,243,0.25)] border-sky-500
        ${
          isOpen
            ? 'h-[340px] rounded-[34px] border' // 열렸을 때 (높이 커짐)
            : 'h-14 rounded-[34px] border' // 닫혔을 때 (높이 56px 고정)
        }
      `}
      // ⚠️ 주의: border-[0.25px]는 너무 얇아서 안 보일 수 있어 'border'(1px)로 설정했습니다.
    >
      {/* 1. 상단 입력창 영역 */}
      <div className="h-14 w-full flex items-center px-6 relative shrink-0">
        {/* [로고 아이콘 자리] - 아이콘 농부님 파일을 여기에 넣으세요 */}
        <div className="mr-4 w-6 h-6 flex items-center justify-center">
          {/* 예: <img src="/icons/search-logo.svg" alt="logo" /> */}
          <span className="text-xl">🕒</span> {/* 임시 아이콘 */}
        </div>

        {/* 입력창 */}
        <input
          type="text"
          className="w-full h-full text-lg text-slate-900 font-medium placeholder:text-slate-400 outline-none bg-transparent"
          placeholder="검색어를 입력하세요"
          onFocus={() => setIsOpen(true)}
        />

        {/* [돋보기 아이콘 자리] */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer">
          {/* 예: <SearchIcon /> */}
          <span className="text-slate-400 text-xl">🔍</span> {/* 임시 아이콘 */}
        </div>
      </div>

      {/* 2. 하단 검색 기록 리스트 */}
      <div
        className={`px-4 pt-2 pb-4 flex flex-col gap-1 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {recentSearches.map((text, index) => (
          <div
            key={index}
            className="group relative w-full h-14 flex items-center px-4 cursor-pointer transition-all duration-200 
            hover:bg-sky-500/10 hover:rounded-[20px]"
          >
            {/* 리스트 아이콘 자리 */}
            <div className="mr-4 w-6 h-6 flex items-center justify-center">
              <span className="text-slate-400 text-sm">🕒</span>
            </div>

            <span className="text-slate-900 text-lg font-medium font-['Pretendard_Variable']">
              {text}
            </span>

            {/* 삭제(X) 버튼 자리 - 호버 시 표시 */}
            <div className="absolute right-4 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-slate-400">✕</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
