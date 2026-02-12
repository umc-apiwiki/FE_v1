import { useState } from 'react'
import * as Sentry from '@sentry/react'
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

    try {
      await updateProfile(requestData)

      alert('비밀번호가 성공적으로 변경되었습니다.')
      resetForm()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined
      
      // 비밀번호 변경 실패는 보안상 중요하므로 Sentry에 보고
      // 단, 예상된 비즈니스 에러(USER4004)는 제외
      if (errorCode !== 'USER4004') {
        Sentry.captureException(error, {
          tags: { service: 'profile', action: 'updatePassword', critical: 'true', security: 'true' },
          extra: { errorCode, errorMessage },
        })
      }
      
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
