export type UserSignInInfo = {
  email: string
  password: string
}

// 이메일 정규식
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

function validateSignIn(values: UserSignInInfo) {
  const errors: Partial<Record<keyof UserSignInInfo, string>> = {}

  // 이메일 검사
  if (!values.email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.'
  }

  // 비밀번호 검사
  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요.'
  }

  return errors
}

export { validateSignIn }
