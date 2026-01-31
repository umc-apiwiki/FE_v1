import { useRef, useEffect, useState } from 'react'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'
import SearchHistory from '@/assets/icons/common/ic_search_history.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'

type SearchBarProps = {
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isMain?: boolean // 홈페이지 여부
}

export default function SearchBar({ isOpen, setIsOpen, isMain = false }: SearchBarProps) {
  // Allow uncontrolled mode when props are not provided
  const [internalOpen, setInternalOpen] = useState(false)
  const controlled = typeof isOpen === 'boolean' && typeof setIsOpen === 'function'
  const openState = controlled ? isOpen : internalOpen
  const setOpen = controlled ? setIsOpen : setInternalOpen
  const containerRef = useRef<HTMLDivElement>(null)

  const recentSearches = ['AWS API', '네이버지도 API', '강아지 앱 API', '게임 앱 API']

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpen])

  return (
    <div className="relative mx-auto w-[876px] h-14">
      <div
        ref={containerRef}
        className={`
          bg-white overflow-hidden transition-all duration-300 ease-in-out
          shadow-[1px_1px_5px_2px_var(--tw-shadow-color)] shadow-brand-500/25 border-brand-500/25
          ${
            isMain
              ? `
                fixed left-1/2 -translate-x-1/2
                transition-all duration-300 ease-in-out
                ${
                  openState
                    ? 'top-1/2 -translate-y-1/2 w-[876px] h-[500px] z-50'
                    : 'top-[60%] -translate-y-1/2 w-[876px] h-14 z-30'
                }
                rounded-[34px] border
              `
              : `
                absolute top-0 left-0 w-full
                rounded-[34px] border z-30
                ${openState ? 'h-[500px]' : 'h-14'}
              `
          }

        `}
      >
        <div className="h-14 w-full flex items-center px-[30px] relative shrink-0">
          <input
            type="text"
            className="w-full h-full text-lg text-info-darker font-medium font-sans placeholder:text-slate-400 outline-none bg-transparent ml-1"
            placeholder="궁금한 API를 검색해보세요"
            onFocus={() => setOpen(true)}
          />

          <div className="w-6 h-6 flex items-center justify-center cursor-pointer ml-4">
            <button type="button">
              <img src={SearchLine} alt="검색" />
            </button>
          </div>
        </div>

        <div
          className={`w-full p-2 px-[10px] flex flex-col gap-1 transition-opacity duration-300 ${openState ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="font-sans font-medium text-lg text-brand-800 tracking-[-1px] px-[20px] p-0">
            Recent
          </span>
          {recentSearches.map((text, index) => (
            <div
              key={index}
              className="group relative w-full h-14 flex items-center px-[20px] cursor-pointer transition-all duration-200
            hover:bg-brand-500/10 hover:rounded-[30px] hover:rounded-br-[30px]"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-4">
                <img src={SearchHistory} alt="최근 기록" />
              </div>

              <span className="text-info-darker text-lg font-medium font-sans flex-1">{text}</span>

              <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button">
                  <img src={Cancel} alt="삭제" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
