export type UserSignupInfo = {
  nickname: string
  email: string
  password: string
  passwordConfirm: string
}

// 공통 이메일 정규식
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

function validateSignup(values: UserSignupInfo) {
  const errors: Partial<Record<keyof UserSignupInfo, string>> = {}

  // 닉네임 검사
  if (!values.nickname.trim()) {
    errors.nickname = '닉네임을 입력해주세요.'
  } else if (values.nickname.length < 2) {
    errors.nickname = '닉네임은 최소 2자 이상이어야 합니다.'
  }

  // 이메일 검사
  if (!values.email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.'
  }

  // 비밀번호 검사
  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요.'
  } else if (values.password.length < 8 || values.password.length >= 20) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.'
  }

  // 비밀번호 확인 검사
  if (!values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해주세요.'
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  }

  return errors
}

export { validateSignup }
