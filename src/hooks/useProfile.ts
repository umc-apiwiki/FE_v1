import { useState } from 'react'
import { updateProfile, checkNicknameDuplicate } from '@/services/user'
import type { ProfileFormData, ProfileFormErrors, UpdateProfileRequest } from '@/types/profile'
import { validateProfileForm, hasChanges } from '@/utils/validateProfile'

type UseProfileUpdateReturn = {
  formData: ProfileFormData
  errors: ProfileFormErrors
  isSubmitting: boolean
  isNicknameChecked: boolean
  isCheckingNickname: boolean
  handleNicknameChange: (value: string) => void
  handlePasswordChange: (value: string) => void
  handlePasswordConfirmChange: (value: string) => void
  handleCheckNickname: () => Promise<void>
  handleSubmit: () => Promise<void>
  resetForm: () => void
}

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
 * 프로필 수정 Custom Hook
 * - 닉네임/비밀번호 변경 로직 관리
 * - 유효성 검사 및 에러 처리
 * - 닉네임 중복 확인
 */
export const useProfileUpdate = (
  currentNickname: string = '',
  onSuccess?: () => void
): UseProfileUpdateReturn => {
  const [formData, setFormData] = useState<ProfileFormData>({
    nickname: '',
    password: '',
    passwordConfirm: '',
  })

  const [errors, setErrors] = useState<ProfileFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)

  /**
   * 닉네임 변경 핸들러
   */
  const handleNicknameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nickname: value }))
    setIsNicknameChecked(false) // 닉네임 변경 시 중복 확인 초기화
    if (errors.nickname) {
      setErrors((prev) => ({ ...prev, nickname: undefined }))
    }
  }

  /**
   * 비밀번호 변경 핸들러
   */
  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }))
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }))
    }
  }

  /**
   * 비밀번호 확인 변경 핸들러
   */
  const handlePasswordConfirmChange = (value: string) => {
    setFormData((prev) => ({ ...prev, passwordConfirm: value }))
    if (errors.passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: undefined }))
    }
  }

  /**
   * 닉네임 중복 확인
   */
  const handleCheckNickname = async () => {
    const { nickname } = formData

    // 빈 값 체크
    if (!nickname.trim()) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임을 입력해주세요.' }))
      return
    }

    // 현재 닉네임과 동일한지 체크
    if (nickname === currentNickname) {
      setErrors((prev) => ({ ...prev, nickname: '현재 사용 중인 닉네임입니다.' }))
      return
    }

    // 기본 유효성 검사
    const validationErrors = validateProfileForm(nickname, '', '')
    if (validationErrors.nickname) {
      setErrors((prev) => ({ ...prev, nickname: validationErrors.nickname }))
      return
    }

    setIsCheckingNickname(true)
    setErrors((prev) => ({ ...prev, nickname: undefined }))

    try {
      await checkNicknameDuplicate(nickname)
      setIsNicknameChecked(true)
      alert('사용 가능한 닉네임입니다.')
    } catch (error: unknown) {
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined

      if (errorCode === 'USER4001') {
        setErrors((prev) => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, nickname: '닉네임 중복 확인에 실패했습니다.' }))
      }
      setIsNicknameChecked(false)
    } finally {
      setIsCheckingNickname(false)
    }
  }

  /**
   * 프로필 수정 제출
   */
  const handleSubmit = async () => {
    const { nickname, password, passwordConfirm } = formData

    // 변경사항 확인
    if (!hasChanges(nickname, password)) {
      alert('변경할 정보를 입력해주세요.')
      return
    }

    // 유효성 검사
    const validationErrors = validateProfileForm(nickname, password, passwordConfirm)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // 닉네임 변경 시 중복 확인 필수
    if (nickname.trim() && !isNicknameChecked) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임 중복 확인이 필요합니다.' }))
      return
    }

    setIsSubmitting(true)

    try {
      // Swagger 명세: 모든 필드 required
      // 닉네임만 변경하거나 비밀번호만 변경하는 경우 빈 문자열 전송
      const updateData: UpdateProfileRequest = {
        nickname: nickname.trim() || '',
        password: password.trim() || '',
        passwordConfirm: passwordConfirm.trim() || '',
      }

      await updateProfile(updateData)

      alert('프로필이 성공적으로 변경되었습니다.')
      resetForm()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      const errorCode = isAxiosError(error) ? error.response?.data?.code : undefined
      const errorMessage = isAxiosError(error) ? error.response?.data?.message : undefined

      if (errorCode === 'USER4004') {
        alert('변경할 정보가 없습니다.')
      } else if (errorMessage) {
        alert(errorMessage)
      } else {
        alert('프로필 변경에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * 폼 초기화
   */
  const resetForm = () => {
    setFormData({
      nickname: '',
      password: '',
      passwordConfirm: '',
    })
    setErrors({})
    setIsNicknameChecked(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    isNicknameChecked,
    isCheckingNickname,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleCheckNickname,
    handleSubmit,
    resetForm,
  }
}
