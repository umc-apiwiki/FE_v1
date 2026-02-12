import { useState } from 'react'
import * as Sentry from '@sentry/react'
import { updateProfile, checkNicknameDuplicate } from '@/services/user'
import { validateNickname } from '@/utils/validateProfile'
import type { AxiosError } from 'axios'

type UseNicknameUpdateReturn = {
  nickname: string
  currentPassword: string
  nicknameError: string | undefined
  passwordError: string | undefined
  isSubmitting: boolean
  isNicknameChecked: boolean
  isCheckingNickname: boolean
  handleNicknameChange: (value: string) => void
  handleCurrentPasswordChange: (value: string) => void
  handleCheckNickname: () => Promise<void>
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
 * 닉네임 변경 Custom Hook
 */
export const useNicknameUpdate = (
  currentNickname: string = '',
  onSuccess?: () => void
): UseNicknameUpdateReturn => {
  const [nickname, setNickname] = useState('')
  const [currentPassword, setCurrentPassword] = useState('') // 현재 비밀번호
  const [nicknameError, setNicknameError] = useState<string | undefined>()
  const [passwordError, setPasswordError] = useState<string | undefined>() // 비밀번호 에러
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)

  const handleNicknameChange = (value: string) => {
    setNickname(value)
    setIsNicknameChecked(false)
    if (nicknameError) {
      setNicknameError(undefined)
    }
  }

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value)
    if (passwordError) {
      setPasswordError(undefined)
    }
  }

  const handleCheckNickname = async () => {
    const trimmedNickname = nickname.trim()

    if (!trimmedNickname) {
      setNicknameError('닉네임을 입력해주세요.')
      return
    }

    if (trimmedNickname === currentNickname) {
      setNicknameError('현재 사용 중인 닉네임입니다.')
      return
    }

    const validationError = validateNickname(trimmedNickname)
    if (validationError) {
      setNicknameError(validationError)
      return
    }

    setIsCheckingNickname(true)
    setNicknameError(undefined)

    try {
      await checkNicknameDuplicate(trimmedNickname)

      setIsNicknameChecked(true)
      alert('사용 가능한 닉네임입니다.')
    } catch (error: unknown) {
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined

      // 예상치 못한 에러는 Sentry에 보고 (USER4001은 예상된 에러이므로 제외)
      if (errorCode !== 'USER4001' && errorCode !== 'AUTH4003') {
        Sentry.captureException(error, {
          tags: { service: 'profile', action: 'checkNickname' },
          extra: { nickname: trimmedNickname, errorCode },
        })
      }

      if (errorCode === 'USER4001') {
        setNicknameError('이미 사용 중인 닉네임입니다.')
      } else if (errorCode === 'AUTH4003') {
        setNicknameError('인증이 만료되었습니다. 다시 로그인해주세요.')
      } else {
        setNicknameError(
          errorMessage || '닉네임 중복 확인에 실패했습니다. 잠시 후 다시 시도해주세요.'
        )
      }
      setIsNicknameChecked(false)
    } finally {
      setIsCheckingNickname(false)
    }
  }

  const handleSubmit = async () => {
    if (!isNicknameChecked) {
      setNicknameError('닉네임 중복 확인이 필요합니다.')
      return
    }

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.')
      return
    }

    if (!currentPassword.trim()) {
      setPasswordError('현재 비밀번호를 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    setNicknameError(undefined)
    setPasswordError(undefined)

    const requestData = {
      nickname: nickname.trim(),
      password: currentPassword.trim(),
      passwordConfirm: currentPassword.trim(),
    }

    try {
      await updateProfile(requestData)

      alert('닉네임이 성공적으로 변경되었습니다.')
      resetForm()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined

      // 닉네임 변경 실패는 중요한 사용자 경험이므로 Sentry에 보고
      // 단, 예상된 비즈니스 에러(USER4001, USER4004)는 제외
      if (errorCode !== 'USER4001' && errorCode !== 'USER4004') {
        Sentry.captureException(error, {
          tags: { service: 'profile', action: 'updateNickname', critical: 'true' },
          extra: { errorCode, errorMessage },
        })
      }

      // 특정 에러 코드에 따른 처리
      if (errorCode === 'USER4001') {
        setNicknameError('이미 사용 중인 닉네임입니다.')
      } else if (errorCode === 'USER4004') {
        setNicknameError('변경할 내용이 없습니다.')
      } else {
        alert(errorMessage || '닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setNickname('')
    setCurrentPassword('')
    setNicknameError(undefined)
    setPasswordError(undefined)
    setIsNicknameChecked(false)
  }

  return {
    nickname,
    currentPassword,
    nicknameError,
    passwordError,
    isSubmitting,
    isNicknameChecked,
    isCheckingNickname,
    handleNicknameChange,
    handleCurrentPasswordChange,
    handleCheckNickname,
    handleSubmit,
    resetForm,
  }
}
