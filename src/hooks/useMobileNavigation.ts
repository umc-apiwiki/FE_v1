/**
 * MobileBottomNavigation 전용 Custom Hook
 * 네비게이션 상태 및 모달 제어 로직
 */

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

type UseMobileNavigationReturn = {
  isLoginModalOpen: boolean
  isSignupModalOpen: boolean
  handleProfileClick: (e: React.MouseEvent) => void
  handleSwitchToSignup: () => void
  handleSwitchToLogin: () => void
  setIsLoginModalOpen: (isOpen: boolean) => void
  setIsSignupModalOpen: (isOpen: boolean) => void
  isActive: (path: string) => boolean
}

export const useMobileNavigation = (): UseMobileNavigationReturn => {
  const location = useLocation()
  const navigate = useNavigate()
  const { accessToken } = useAuth()
  const isAuthenticated = !!accessToken
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  // 프로필 클릭 핸들러
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isAuthenticated) {
      navigate('/profile')
    } else {
      setIsLoginModalOpen(true)
    }
  }

  // 로그인/회원가입 모달 전환
  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  // 활성 경로 확인
  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  return {
    isLoginModalOpen,
    isSignupModalOpen,
    handleProfileClick,
    handleSwitchToSignup,
    handleSwitchToLogin,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    isActive,
  }
}
