import { Link } from 'react-router-dom'
import HomeLogo from '@/assets/icons/navigation/ic_home_logo.svg'
import { useEffect, useRef, useState } from 'react'
import profileImg from '@/assets/default_profile.png'

const Header = () => {
  const user = {
    name: 'nongbu',
    profileImg: profileImg,
  }
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <header>
      {/* 상단 네비게이션 바 레이아웃 및 스타일 설정함 */}
      <nav className="grid h-20 w-full grid-cols-3 items-center justify-between overflow-visible">
        {/* 좌측 로고 및 타이틀 영역 메인 페이지로 이동 */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center pt-2 gap-[7px] sm:pl-8 md:pl-16 lg:pl-32">
            <img src={HomeLogo} alt="Home Logo Icon" />
            <span className="font-mono antialiased text-[27px] font-medium tracking-[-3px] text-brand-500">
              API Wiki
            </span>
          </Link>
        </div>

        {/* 중앙 메뉴 */}
        <div className="flex justify-self-center sm:gap-12 md:gap-16 lg:gap-36 whitespace-nowrap font-sans text-xl font-medium tracking-[-1px] text-[#0D3C61] pr-2">
          <Link to="/bookmark" className="hover:text-brand-500">
            Bookmark
          </Link>
          <Link to="/explore" className="hover:text-brand-500">
            Explore
          </Link>
          <Link to="/about" className="hover:text-brand-500">
            About Us
          </Link>
        </div>

        {/* 우측 로그인 버튼 영역*/}
        <div className="flex justify-self-end whitespace-nowrap pr-4 sm:pr-8 md:pr-16 lg:pr-32 font-sans text-xl font-medium tracking-[-1px] text-[#0D3C61]">
          {!user ? (
            // 로그인 안 했을 때
            <span>Login</span>
          ) : (
            // 로그인 했을 때
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer focus:outline-none pt-2"
              >
                <img
                  src={user.profileImg}
                  alt="프로필 이미지"
                  className="w-10 h-10 rounded-full border border-brand-500 object-cover"
                />
              </button>
              {isOpen && (
                <div className="absolute right-0 z-50 w-[118px] h-36 bg-white border border-brand-500/25 shadow-lg shadow-brand-500/25 rounded-lg rounded-tr-none flex flex-col gap-3 py-4 text-center text-lg font-sans font-medium text-[#0d3c61]">
                  <button className="hover:text-brand-500">Profile</button>
                  <button className="hover:text-brand-500">History</button>
                  <button className="hover:text-brand-500">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
