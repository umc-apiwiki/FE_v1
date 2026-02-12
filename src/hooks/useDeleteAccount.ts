import { useState } from 'react'
import * as Sentry from '@sentry/react'
import { deleteUser } from '@/services/user'

type UseDeleteAccountReturn = {
  confirmText: string
  isDeleting: boolean
  isConfirmValid: boolean
  handleConfirmTextChange: (value: string) => void
  handleSubmit: () => Promise<void>
  resetForm: () => void
}

const CONFIRM_MESSAGE = '탈퇴하겠습니다'

/**
 * Axios 에러 응답 타입 가드
 */
const isAxiosError = (
  error: unknown
): error is {
  response?: {
    data?: {
      code?: string
      message?: string
    }
  }
} => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error &&
    error.response !== null &&
    typeof error.response === 'object' &&
    'data' in error.response
  )
}

/**
 * 회원 탈퇴 Custom Hook
 */
export const useDeleteAccount = (onSuccess?: () => void): UseDeleteAccountReturn => {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // 입력값이 정확히 일치하는지 확인
  const isConfirmValid = confirmText === CONFIRM_MESSAGE

  const handleConfirmTextChange = (value: string) => {
    setConfirmText(value)
  }

  const handleSubmit = async () => {
    if (!isConfirmValid) {
      alert(`"${CONFIRM_MESSAGE}"를 정확히 입력해주세요.`)
      return
    }

    if (!confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteUser()
      alert('회원 탈퇴가 완료되었습니다.')

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined

      // 회원 탈퇴 실패는 중요한 이슈이므로 Sentry에 보고
      Sentry.captureException(error, {
        tags: { service: 'profile', action: 'deleteAccount', critical: 'true' },
        extra: { errorMessage },
      })

      alert(errorMessage || '회원 탈퇴에 실패했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  const resetForm = () => {
    setConfirmText('')
  }

  return {
    confirmText,
    isDeleting,
    isConfirmValid,
    handleConfirmTextChange,
    handleSubmit,
    resetForm,
  }
}
