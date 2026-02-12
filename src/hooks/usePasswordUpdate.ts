import { useState } from 'react'
import { updateProfile } from '@/services/user'
import { validatePassword, validatePasswordConfirm } from '@/utils/validateProfile'
import type { AxiosError } from 'axios'

type UsePasswordUpdateReturn = {
  password: string
  passwordConfirm: string
  passwordError: string | undefined
  passwordConfirmError: string | undefined
  isSubmitting: boolean
  isPasswordValid: boolean
  handlePasswordChange: (value: string) => void
  handlePasswordConfirmChange: (value: string) => void
  handleSubmit: () => Promise<void>
  resetForm: () => void
}

type ApiErrorResponse = {
  code?: string
  message?: string
}

/**
 * Axios 에러 응답 타입 가드
 */
const isAxiosError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  )
}

/**
 * 비밀번호 변경 Custom Hook
 */
export const usePasswordUpdate = (
  currentNickname: string = '',
  onSuccess?: () => void
): UsePasswordUpdateReturn => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>()
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 비밀번호 유효성 검사 (실시간)
  const isPasswordValid =
    password.trim() !== '' &&
    passwordConfirm.trim() !== '' &&
    !validatePassword(password) &&
    !validatePasswordConfirm(password, passwordConfirm)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (passwordError) {
      setPasswordError(undefined)
    }
    // 비밀번호 변경 시 확인 필드도 재검증
    if (passwordConfirm && value !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
    } else if (passwordConfirmError) {
      setPasswordConfirmError(undefined)
    }
  }

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value)
    if (passwordConfirmError) {
      setPasswordConfirmError(undefined)
    }
    // 확인 필드 변경 시 일치 여부 검증
    if (password && value !== password) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
    }
  }

  const handleSubmit = async () => {
    // 유효성 검사
    const pwError = validatePassword(password)
    const pwConfirmError = validatePasswordConfirm(password, passwordConfirm)

    if (pwError || pwConfirmError) {
      setPasswordError(pwError)
      setPasswordConfirmError(pwConfirmError)
      return
    }

    if (!password.trim() || !passwordConfirm.trim()) {
      setPasswordError('비밀번호를 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    setPasswordError(undefined)
    setPasswordConfirmError(undefined)

    const requestData = {
      nickname: currentNickname, // 기존 닉네임 그대로 전송
      password: password.trim(),
      passwordConfirm: passwordConfirm.trim(),
    }

    console.group('🔵 [usePasswordUpdate] 비밀번호 변경 요청')
    console.log('📤 요청 데이터:', {
      nickname: requestData.nickname,
      password: '***' + password.slice(-2), // 보안: 마지막 2자만 표시
      passwordConfirm: '***' + passwordConfirm.slice(-2),
      passwordLength: password.length,
    })
    console.log('⏰ 시각:', new Date().toISOString())
    console.groupEnd()

    try {
      const response = await updateProfile(requestData)
      
      console.group('✅ [usePasswordUpdate] 비밀번호 변경 성공')
      console.log('📥 응답 데이터:', response)
      console.log('⏰ 시각:', new Date().toISOString())
      console.groupEnd()

      alert('비밀번호가 성공적으로 변경되었습니다.')
      resetForm()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      console.group('❌ [usePasswordUpdate] 비밀번호 변경 실패')
      console.error('💥 에러 객체:', error)
      
      if (isAxiosError(error)) {
        console.log('📊 HTTP Status:', error.response?.status)
        console.log('📋 응답 데이터:', error.response?.data)
        console.log('🔑 에러 코드:', error.response?.data?.code)
        console.log('📝 에러 메시지:', error.response?.data?.message)
        console.log('🌐 요청 URL:', error.config?.url)
        console.log('📤 요청 메서드:', error.config?.method?.toUpperCase())
        console.log('📦 요청 헤더:', error.config?.headers)
        console.log('🔐 Authorization 헤더 존재:', !!error.config?.headers?.Authorization)
      }
      console.log('⏰ 시각:', new Date().toISOString())
      console.groupEnd()
      
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined
      
      // 특정 에러 코드에 따른 처리
      if (errorCode === 'USER4004') {
        setPasswordError('변경할 내용이 없습니다.')
      } else if (errorCode === 'AUTH4003') {
        setPasswordError('인증이 만료되었습니다. 다시 로그인해주세요.')
      } else {
        alert(errorMessage || '비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setPassword('')
    setPasswordConfirm('')
    setPasswordError(undefined)
    setPasswordConfirmError(undefined)
  }

  return {
    password,
    passwordConfirm,
    passwordError,
    passwordConfirmError,
    isSubmitting,
    isPasswordValid,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
    resetForm,
  }
}
