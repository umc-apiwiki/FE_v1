/**
 * MobileBottomNavigation 전용 Custom Hook
 * 네비게이션 상태 및 모달 제어 로직
 */

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { postSignup } from '@/apis/auth'
import type { RequestSigninDto, RequestSignupDto } from '@/types/auth'

type UseMobileNavigationReturn = {
  isLoginModalOpen: boolean
  isSignupModalOpen: boolean
  loginForm: {
    email: string
    password: string
  }
  signupForm: {
    email: string
    password: string
    nickname: string
  }
  handleProfileClick: (e: React.MouseEvent) => void
  handleSwitchToSignup: () => void
  handleSwitchToLogin: () => void
  setIsLoginModalOpen: (isOpen: boolean) => void
  setIsSignupModalOpen: (isOpen: boolean) => void
  isActive: (path: string) => boolean
  handleLoginChange: (field: keyof RequestSigninDto, value: string) => void
  handleSignupChange: (field: keyof RequestSignupDto, value: string) => void
  handleLoginSubmit: () => Promise<void>
  handleSignupSubmit: () => Promise<void>
  isLoading: boolean
}

export const useMobileNavigation = (): UseMobileNavigationReturn => {
  const location = useLocation()
  const navigate = useNavigate()
  const { accessToken, login } = useAuth()
  const isAuthenticated = !!accessToken
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState<RequestSigninDto>({
    email: '',
    password: '',
  })

  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState<RequestSignupDto>({
    email: '',
    password: '',
    nickname: '',
  })

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
    // 폼 초기화
    setLoginForm({ email: '', password: '' })
  }

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
    // 폼 초기화
    setSignupForm({ email: '', password: '', nickname: '' })
  }

  // 활성 경로 확인
  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  // 로그인 폼 입력 핸들러
  const handleLoginChange = (field: keyof RequestSigninDto, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }))
  }

  // 회원가입 폼 입력 핸들러
  const handleSignupChange = (field: keyof RequestSignupDto, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }))
  }

  // 로그인 제출
  const handleLoginSubmit = async () => {
    if (isLoading) return

    // 유효성 검사
    if (!loginForm.email || !loginForm.password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      await login(loginForm)
      // 로그인 성공 시 AuthProvider의 login 함수에서 리다이렉트 처리
      setIsLoginModalOpen(false)
      setLoginForm({ email: '', password: '' })
    } catch (error: unknown) {
      console.error('로그인 실패:', error)
      
      // Axios 에러에서 서버 응답 메시지 추출
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const responseData = error.response.data as { message?: string }
        const errorMessage = responseData?.message || '로그인 중 오류가 발생했습니다.'
        alert(errorMessage)
      } else {
        alert('로그인 중 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 회원가입 제출
  const handleSignupSubmit = async () => {
    if (isLoading) return

    // 유효성 검사
    if (!signupForm.email || !signupForm.password || !signupForm.nickname) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      const response = await postSignup(signupForm)

      if (response.isSuccess && response.result) {
        alert('회원가입 성공! 로그인해주세요.')
        setIsSignupModalOpen(false)
        setIsLoginModalOpen(true)
        setSignupForm({ email: '', password: '', nickname: '' })
      } else {
        alert(response.message || '회원가입에 실패했습니다.')
      }
    } catch (error: unknown) {
      console.error('회원가입 실패:', error)
      
      // Axios 에러에서 서버 응답 메시지 추출
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response
      ) {
        const responseData = error.response.data as { message?: string }
        const errorMessage = responseData?.message || '회원가입 중 오류가 발생했습니다.'
        alert(errorMessage)
      } else {
        alert('회원가입 중 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoginModalOpen,
    isSignupModalOpen,
    loginForm,
    signupForm,
    handleProfileClick,
    handleSwitchToSignup,
    handleSwitchToLogin,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    isActive,
    handleLoginChange,
    handleSignupChange,
    handleLoginSubmit,
    handleSignupSubmit,
    isLoading,
  }
}
