import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import ModalInput from './components/ModalInput'
import ModalButton from './components/ModalButton'
import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'
import { validateSignup } from '@/utils/validateSignUp'
import useForm from '@/hooks/useForm'
import { postSignup } from '@/apis/auth'
import axios from 'axios'

type SignUpModalProps = {
  onClose: () => void
  onSwitchToSignIn: () => void
}

const initialValue = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

interface ApiError {
  message: string
}

export default function SignUpModal({ onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { values, errors, touched, getInputProps } = useForm({
    initialValue,
    validate: validateSignup,
  })

  const isFormValid =
    Object.values(values).every((value) => value.trim() !== '') && Object.keys(errors).length === 0

  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await postSignup({
        nickname: values.nickname,
        email: values.email,
        password: values.password,
      })

      if (response.isSuccess) {
        alert('회원가입이 완료되었습니다.')
        onClose()
      } else {
        setErrorMessage(response.message || '회원가입에 실패했습니다.')
      }
    } catch (error: unknown) {
      let message = '네트워크 오류가 발생했습니다.'

      /* axios 에러인지 확인하며 타입 좁히기 수행 */
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message
      } else if (error instanceof Error) {
        message = error.message
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage)
    }
  }, [errorMessage])

  return (
    <Modal onClose={onClose}>
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="absolute right-2 z-50 m-4">
        <img src={Cancel} alt="닫기" />
      </button>

      {/* 모달 안 */}
      <div className="m-8 flex flex-col items-center">
        {/* 아이콘 */}
        <div className="flex flex-col items-center mb-6">
          <img src={BrandLogo} alt="API Wiki 로고" className="w-20 h-22" />
          <h1 className="font-mono font-medium text-[45px] text-brand-500 tracking-[-3px] -mt-3">
            API Wiki
          </h1>
        </div>

        {/* 입력 영역 */}
        <div className="flex flex-col gap-5 mb-3">
          {/* 닉네임 입력 */}
          <div>
            <ModalInput
              placeholder="닉네임"
              isError={touched.nickname && !!errors.nickname}
              {...getInputProps('nickname')}
            />
            {touched.nickname && errors.nickname && (
              <p className="absolute text-xs text-error-dark pl-5">{errors.nickname}</p>
            )}
          </div>

          {/* 이메일 입력 */}
          <div>
            <ModalInput
              type="email"
              placeholder="이메일"
              isError={touched.email && !!errors.email}
              {...getInputProps('email')}
            />
            {touched.email && errors.email && (
              <p className="absolute text-xs text-error-dark pl-5">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <ModalInput
              type="password"
              placeholder="비밀번호"
              isError={touched.password && !!errors.password}
              {...getInputProps('password')}
            />
            {touched.password && errors.password && (
              <p className="absolute text-xs text-error-dark pl-5">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <ModalInput
              type="password"
              placeholder="비밀번호 확인"
              {...getInputProps('passwordConfirm')}
              isError={touched.passwordConfirm && !!errors.passwordConfirm}
            />
            {touched.passwordConfirm && errors.passwordConfirm && (
              <p className="absolute text-xs text-error-dark pl-5">{errors.passwordConfirm}</p>
            )}
          </div>

          <ModalButton onClick={handleSubmit} disabled={!isFormValid || isLoading}>
            회원가입
          </ModalButton>
        </div>

        {/* 하단 링크 */}
        <div
          className="flex text-xs text-[#BEBEBE] gap-2 mb-3 cursor-pointer"
          onClick={onSwitchToSignIn}
        >
          <span>로그인</span>
        </div>

        {/* 약관 */}
        <p className="text-center text-xs text-[#BEBEBE] leading-3">
          계속 진행할 경우 API WIKI의 이용약관에 동의하고 <br />
          개인정보 처리 방침을 이해하는 것으로 간주됩니다.
        </p>
      </div>
    </Modal>
  )
}
