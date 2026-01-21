import { useRef, useEffect } from 'react'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'
import SearchHistory from '@/assets/icons/common/ic_search_history.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'

type SearchBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({ isOpen, setIsOpen }: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 검색어 데이터 4개
  const recentSearches = ['AWS API', '네이버지도 API', '강아지 앱 API', '게임 앱 API']

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`
        relative mx-auto bg-white overflow-hidden transition-all duration-300 ease-in-out z-50
        w-[876px] shadow-[1px_1px_5px_2px_rgba(33,150,243,0.25)] border-brand-500/25
        ${
          isOpen
            ? 'h-[500px] rounded-[20px] border'
            : 'h-14 rounded-[34px] border' // 닫혔을 때
        }
      `}
    >
      {/* 2. 상단 입력창 영역 */}
      <div className="h-14 w-full flex items-center px-[30px] relative shrink-0">

        {/* 입력창 */}
        <input
          type="text"
          className="w-full h-full text-lg text-[#071E31] font-medium font-sans placeholder:text-slate-400 outline-none bg-transparent ml-1"
          placeholder="궁금한 API를 검색해보세요"
          onFocus={() => setIsOpen(true)}
        />

        {/* [돋보기 아이콘 자리] */}
        <div className="w-6 h-6 flex items-center justify-center cursor-pointer ml-4">
          <button type='button'>
            <img src={SearchLine} alt="검색"/>
          </button>
        </div>
      </div>

      {/* 3. 하단 검색 기록 리스트 */}
      <div
        className={`w-full p-2 px-[10px] flex flex-col gap-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className='font-sans font-medium text-lg text-brand-800 tracking-[-1px] px-[20px] p-0'>Recent</span>
        {recentSearches.map((text, index) => (
          <div
            key={index}
            className="group relative w-full h-14 flex items-center px-[20px] cursor-pointer transition-all duration-200
            hover:bg-brand-500/10 hover:rounded-[30px] hover:rounded-br-[30px]"
          >
            {/* 시계 아이콘 */}
            <div className="w-6 h-6 flex items-center justify-center mr-4">
              <img src={SearchHistory} alt="최근 기록"/>
            </div>

            {/* 텍스트 */}
            <span className="text-[#071E31] text-lg font-medium font-sans flex-1">
              {text}
            </span>

            {/* X 버튼 */}
            <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button type='button'>
                <img src={Cancel} alt="삭제"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
