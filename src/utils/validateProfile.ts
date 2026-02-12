import type { ProfileFormErrors } from '@/types/profile'

/**
 * 닉네임 유효성 검사
 * - 2~10자 이내
 * - 한글, 영문, 숫자만 허용
 */
export const validateNickname = (nickname: string): string | undefined => {
  if (!nickname) {
    return undefined // 빈 값은 허용 (선택적 변경)
  }

  if (nickname.length < 2 || nickname.length > 10) {
    return '닉네임은 2~10자 이내로 입력해주세요.'
  }

  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/
  if (!nicknameRegex.test(nickname)) {
    return '닉네임은 한글, 영문, 숫자만 가능합니다.'
  }

  return undefined
}

/**
 * 비밀번호 유효성 검사
 * - 8자 이상
 * - 영문, 숫자, 특수문자 포함
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return undefined // 빈 값은 허용 (선택적 변경)
  }

  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.'
  }

  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!hasLetter || !hasNumber) {
    return '비밀번호는 영문과 숫자를 포함해야 합니다.'
  }

  return undefined
}

/**
 * 비밀번호 확인 유효성 검사
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): string | undefined => {
  if (!password && !passwordConfirm) {
    return undefined // 둘 다 비어있으면 검사하지 않음
  }

  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.'
  }

  return undefined
}

/**
 * 프로필 폼 전체 유효성 검사
 */
export const validateProfileForm = (
  nickname: string,
  password: string,
  passwordConfirm: string
): ProfileFormErrors => {
  const errors: ProfileFormErrors = {}

  const nicknameError = validateNickname(nickname)
  if (nicknameError) {
    errors.nickname = nicknameError
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    errors.password = passwordError
  }

  const passwordConfirmError = validatePasswordConfirm(password, passwordConfirm)
  if (passwordConfirmError) {
    errors.passwordConfirm = passwordConfirmError
  }

  return errors
}

/**
 * 변경사항 확인 (하나 이상의 변경이 있는지 체크)
 */
export const hasChanges = (nickname: string, password: string): boolean => {
  return nickname.trim() !== '' || password.trim() !== ''
}
