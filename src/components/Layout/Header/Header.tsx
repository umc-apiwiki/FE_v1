import { Link } from 'react-router-dom'
import HomeLogo from '@/assets/icons/navigation/ic_home_logo.svg'
import { useEffect, useRef, useState } from 'react'
import SignInModal from '@/components/modal/SignInModal'
import SignUpModal from '@/components/modal/SignUpModal'
import { useAuth } from '@/hooks/useAuth'
import { getMyInfo } from '@/apis/auth'
import ProfileImg from '@/assets/default_profile.png'

const Header = () => {
  const { accessToken, logout } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ nickname: string; profileImg: string } | null>(null)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const switchToSignUp = () => {
    setIsSignUpOpen(true)
    setIsSignInOpen(false)
  }

  const switchToSignIn = () => {
    setIsSignUpOpen(false)
    setIsSignInOpen(true)
  }

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    setUser(null)
  }

  // 인증 토큰 상태에 따른 유저 상세 정보 수신 로직임
  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await getMyInfo()
          if (response && response.result) {
            setUser({
              nickname: response.result.nickname,
              profileImg: ProfileImg,
            })
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('사용자 정보 로드 중 오류 발생함', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    fetchUserData()
  }, [accessToken])

  // 외부 클릭 및 키 입력에 따른 드롭다운 상태 제어임
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
    <header className="sticky top-0 z-[60] bg-brand-50/50">
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
        <div className="flex justify-self-center sm:gap-12 md:gap-16 lg:gap-36 whitespace-nowrap font-sans text-xl font-medium tracking-[-1px] text-info-dark pr-2">
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

        {/* 우측 로그인 버튼 영역 */}
        <div className="flex justify-self-end whitespace-nowrap pr-4 sm:pr-8 md:pr-16 lg:pr-32 font-sans text-xl font-medium tracking-[-1px] text-info-dark">
          {!accessToken && !user ? (
            // 로그인 안 했을 때
            <span
              className="cursor-pointer hover:text-brand-500"
              onClick={() => setIsSignInOpen(true)}
            >
              Login
            </span>
          ) : (
            // 로그인 했을 때
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer focus:outline-none pt-2"
              >
                {/* 프로필 이미지가 없으면 기본 이미지를 보여주도록 처리 */}
                <img
                  src={user?.profileImg || ProfileImg}
                  alt="프로필 이미지"
                  className="w-10 h-10 rounded-full border border-brand-500 object-cover"
                />
              </button>
              {isOpen && (
                <div className="absolute right-0 z-50 w-[118px] h-36 bg-white border border-brand-500/25 shadow-lg shadow-brand-500/25 rounded-lg rounded-tr-none flex flex-col gap-3 py-4 text-center text-lg font-sans font-medium text-info-dark">
                  <Link
                    to="/profile"
                    className="hover:text-brand-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/history"
                    className="hover:text-brand-500"
                    onClick={() => setIsOpen(false)}
                  >
                    History
                  </Link>
                  <button className="hover:text-error-dark" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {isSignInOpen && (
          <SignInModal onClose={() => setIsSignInOpen(false)} onSwitchToSignUp={switchToSignUp} />
        )}
        {isSignUpOpen && (
          <SignUpModal onClose={() => setIsSignUpOpen(false)} onSwitchToSignIn={switchToSignIn} />
        )}
      </nav>
    </header>
  )
}

export default Header
