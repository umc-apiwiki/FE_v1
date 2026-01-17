import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 검색어 데이터 4개
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
        relative mx-auto bg-white overflow-hidden transition-all duration-300 ease-in-out z-50
        w-[876px] shadow-[1px_1px_5px_2px_rgba(33,150,243,0.25)] border-sky-500 box-border
        ${
          isOpen
            ? 'h-[324px] rounded-[34px] border' // 수정됨: 360px -> 324px (4개 딱 맞는 높이)
            : 'h-14 rounded-[34px] border' // 닫혔을 때
        }
      `}
    >
      {/* 2. 상단 입력창 영역 */}
      <div className="h-14 w-full flex items-center px-[30px] relative shrink-0">
        {/* [로고 아이콘 자리] */}
        <div className="w-6 h-6 flex items-center justify-center mr-4">
          <div className="w-5 h-4 bg-black/20" />
        </div>

        {/* 입력창 */}
        <input
          type="text"
          className="w-full h-full text-lg text-slate-900 font-medium font-['Pretendard_Variable'] placeholder:text-slate-400 outline-none bg-transparent"
          placeholder="검색어를 입력하세요"
          onFocus={() => setIsOpen(true)}
        />

        {/* [돋보기 아이콘 자리] */}
        <div className="w-6 h-6 flex items-center justify-center cursor-pointer ml-4">
          <div className="w-5 h-5 bg-black/20 rounded-full" />
        </div>
      </div>

      {/* 3. 하단 검색 기록 리스트 */}
      <div
        className={`w-full pt-2 pb-6 px-[10px] flex flex-col gap-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        {recentSearches.map((text, index) => (
          <div
            key={index}
            className="group relative w-full h-14 flex items-center px-[20px] cursor-pointer transition-all duration-200
            hover:bg-sky-500/10 hover:rounded-tr-[30px] hover:rounded-br-[30px]"
          >
            {/* 시계 아이콘 */}
            <div className="w-6 h-6 flex items-center justify-center mr-4">
              <div className="w-5 h-4 bg-black/20" />
            </div>

            {/* 텍스트 */}
            <span className="text-slate-900 text-lg font-medium font-['Pretendard_Variable'] flex-1">
              {text}
            </span>

            {/* X 버튼 */}
            <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 bg-black/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
