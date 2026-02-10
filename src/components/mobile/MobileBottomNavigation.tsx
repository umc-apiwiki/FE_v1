/**
 * MobileBottomNavigation 컴포넌트
 * 모바일 환경에서 하단 네비게이션 바 표시
 * 로직은 useMobileNavigation Hook으로 완전히 분리
 */

import { Link } from 'react-router-dom'
import { useMobileNavigation } from '../../hooks/useMobileNavigation'

export const MobileBottomNavigation = () => {
  const {
    isLoginModalOpen,
    isSignupModalOpen,
    handleProfileClick,
    handleSwitchToSignup,
    handleSwitchToLogin,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    isActive,
  } = useMobileNavigation()

  const navItems = [
    {
      id: 'home',
      href: '/',
      svg: (color: string) => (
        <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
          <path
            d="M11.2897 2.25763C11.7671 1.85176 12.3734 1.62891 13 1.62891C13.6266 1.62891 14.2329 1.85176 14.7103 2.25763L22.6322 8.99082C22.9238 9.2387 23.158 9.547 23.3186 9.89436C23.4793 10.2417 23.5625 10.6199 23.5625 11.0026V21.5326C23.5625 22.0713 23.3485 22.5879 22.9676 22.9689C22.5866 23.3498 22.07 23.5638 21.5313 23.5638H18.2813C17.7425 23.5638 17.2259 23.3498 16.8449 22.9689C16.464 22.5879 16.25 22.0713 16.25 21.5326V16.2513C16.25 15.8216 16.0798 15.4094 15.7766 15.1049C15.4735 14.8003 15.062 14.6283 14.6323 14.6263H11.3669C10.9373 14.6285 10.5261 14.8006 10.2231 15.1051C9.92008 15.4096 9.75 15.8217 9.75 16.2513V21.5326C9.75 21.7993 9.69746 22.0635 9.59538 22.3099C9.4933 22.5563 9.34368 22.7803 9.15506 22.9689C8.96644 23.1575 8.74252 23.3071 8.49608 23.4092C8.24963 23.5113 7.9855 23.5638 7.71875 23.5638H4.46875C3.93003 23.5638 3.41337 23.3498 3.03244 22.9689C2.65151 22.5879 2.4375 22.0713 2.4375 21.5326V11.0026C2.43752 10.6199 2.52073 10.2417 2.68137 9.89436C2.842 9.547 3.07623 9.2387 3.36781 8.99082L11.2897 2.25763Z"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      onClick: null,
    },
    {
      id: 'explore',
      href: '/explore',
      svg: (color: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
          <path d="M16 16L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      onClick: null,
    },
    {
      id: 'bookmark',
      href: '/bookmark',
      svg: (color: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: null,
    },
    {
      id: 'profile',
      href: '/profile',
      svg: (color: string) => (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path
            d="M14.5146 19.4014H17.4844C21.857 19.4014 25.3993 22.9438 25.3994 27.3164C25.3994 27.584 25.1826 27.8015 24.915 27.8018H7.08496C6.81725 27.8018 6.59961 27.5841 6.59961 27.3164C6.59969 22.9438 10.142 19.4014 14.5146 19.4014ZM16 4.60156C18.7625 4.60177 21 6.83898 21 9.60156C21 12.3641 18.7625 14.6014 16 14.6016C13.2373 14.6016 11 12.3643 11 9.60156C11 6.83885 13.2373 4.60156 16 4.60156Z"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      ),
      onClick: handleProfileClick,
    },
  ]

  return (
    <>
      {/* 모바일 하단 네비게이션: 768px 미만에서만 표시 */}
      <nav className="fixed bottom-0 left-0 right-0 w-full max-w-full h-14 xs:h-15 sm:h-16 bg-white/50 backdrop-blur-lg border-l border-r border-t border-sky-500/30 rounded-t-xl xs:rounded-t-2xl z-50 box-border m-0 p-0 md:hidden mobile-safe-area-bottom">
        <div className="flex justify-around items-center h-full w-full px-1 xs:px-2 box-border">
          {navItems.map(({ svg, href, id, onClick }) => {
            const active = isActive(href)
            const iconColor = active ? '#2196F3' : '#000000'

            if (onClick) {
              return (
                <button
                  key={id}
                  onClick={onClick}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 xs:gap-1 no-underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0 m-0 active:scale-95"
                >
                  <div className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 rounded-lg transition-all duration-200 active:bg-sky-500/10">
                    {svg(iconColor)}
                  </div>
                </button>
              )
            }

            return (
              <Link
                key={id}
                to={href}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 xs:gap-1 no-underline transition-all duration-200 cursor-pointer active:scale-95"
              >
                <div className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 rounded-lg transition-all duration-200 active:bg-sky-500/10">
                  {svg(iconColor)}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-sm xs:max-w-md p-4 xs:p-5 sm:p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900">로그인</h2>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-3 xs:gap-4">
              <div className="flex flex-col gap-1.5 xs:gap-2">
                <label className="text-xs xs:text-sm font-semibold text-gray-700">이메일</label>
                <input
                  type="email"
                  className="px-3 xs:px-4 py-2 border border-gray-300 rounded-lg text-xs xs:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-1.5 xs:gap-2">
                <label className="text-xs xs:text-sm font-semibold text-gray-700">비밀번호</label>
                <input
                  type="password"
                  className="px-3 xs:px-4 py-2 border border-gray-300 rounded-lg text-xs xs:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 xs:mt-5 sm:mt-6">
              <button className="px-5 xs:px-6 py-2 bg-blue-500 text-white rounded-lg text-sm xs:text-base font-semibold text-center transition-all hover:bg-blue-600 active:scale-98">
                로그인
              </button>
              <button
                onClick={handleSwitchToSignup}
                className="px-2 py-1 bg-transparent text-xs xs:text-sm text-gray-600 text-center cursor-pointer hover:text-gray-900"
              >
                회원가입으로
              </button>
            </div>
          </div>
        </div>
      )}
      {isSignupModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-sm xs:max-w-md p-4 xs:p-5 sm:p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900">회원가입</h2>
              <button
                onClick={() => setIsSignupModalOpen(false)}
                className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-3 xs:gap-4">
              <div className="flex flex-col gap-1.5 xs:gap-2">
                <label className="text-xs xs:text-sm font-semibold text-gray-700">이메일</label>
                <input
                  type="email"
                  className="px-3 xs:px-4 py-2 border border-gray-300 rounded-lg text-xs xs:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-1.5 xs:gap-2">
                <label className="text-xs xs:text-sm font-semibold text-gray-700">비밀번호</label>
                <input
                  type="password"
                  className="px-3 xs:px-4 py-2 border border-gray-300 rounded-lg text-xs xs:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 xs:mt-5 sm:mt-6">
              <button className="px-5 xs:px-6 py-2 bg-blue-500 text-white rounded-lg text-sm xs:text-base font-semibold text-center transition-all hover:bg-blue-600 active:scale-98">
                회원가입
              </button>
              <button
                onClick={handleSwitchToLogin}
                className="px-2 py-1 bg-transparent text-xs xs:text-sm text-gray-600 text-center cursor-pointer hover:text-gray-900"
              >
                로그인으로
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
