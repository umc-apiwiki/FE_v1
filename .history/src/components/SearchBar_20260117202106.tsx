import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 4개의 검색어 리스트
  const searchTerms = [
    'AWS API',
    '네이버지도 API',
    '강아지 앱 API',
    '게임 앱 API',
  ];

  // 검색바 외부를 클릭했을 때 닫히게 하는 기능
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
    // 1. 컨테이너: absolute를 제거하고 높이(max-h) 애니메이션을 적용
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl bg-white border shadow-md transition-all duration-500 ease-in-out overflow-hidden z-20
        ${
          isOpen
            ? 'border-sky-500 rounded-[30px] max-h-[400px] shadow-lg' // 열렸을 때: 파란 테두리, 높이 증가, 둥글기 변경
            : 'border-gray-100 rounded-full max-h-14' // 닫혔을 때: 회색 테두리, 높이 고정(56px)
        }
      `}
    >
      {/* 2. 상단 검색 입력창 영역 */}
      <div className="relative h-14 flex items-center px-6">
        {/* 아이콘 (왼쪽) */}
        <span className="text-xl mr-4">🕒</span>

        <input
          type="text"
          className="w-full h-full text-slate-900 outline-none placeholder:text-slate-400 bg-transparent"
          placeholder={isOpen ? '' : 'AWS API'} // 열리면 placeholder 숨김(선택사항)
          onFocus={() => setIsOpen(true)} // 포커스 되면 열림
        />

        {/* 돋보기 아이콘 (오른쪽) */}
        <div className="w-8 h-8 flex items-center justify-center">
          {/* 필요시 svg 아이콘으로 교체 가능 */}
          <span className="text-slate-400">🔍</span>
        </div>
      </div>

      {/* 3. 하단 검색 기록 영역 (열렸을 때만 보임) */}
      <div
        className={`px-4 pb-4 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        {/* 구분선 */}
        <div className="h-[1px] bg-slate-100 mx-2 mb-2"></div>

        <div className="flex justify-between items-center px-2 mb-2">
          <span className="text-xs text-slate-400 font-medium">Recent</span>
          <button className="text-xs text-slate-400 hover:text-slate-600">
            모두 지우기
          </button>
        </div>

        {/* 리스트 아이템들 */}
        <div className="flex flex-col">
          {searchTerms.map((term, index) => (
            <div
              key={index}
              className="px-4 py-3 flex items-center justify-between hover:bg-sky-50 rounded-xl cursor-pointer transition-colors group/item"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm">🕒</span>
                <span className="text-slate-700 font-medium text-sm">
                  {term}
                </span>
              </div>
              <button className="text-slate-400 text-xs hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
