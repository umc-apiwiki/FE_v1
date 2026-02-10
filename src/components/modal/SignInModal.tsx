import { useState } from 'react'
import Modal from '../modal/Modal'
import ModalInput from './components/ModalInput'
import ModalButton from './components/ModalButton'
import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'
import { validateSignIn } from '@/utils/validateSignIn'
import useForm from '@/hooks/useForm'
import { useAuth } from '@/hooks/useAuth'

type LoginModalProps = {
  onClose: () => void
  onSwitchToSignUp: () => void
}

const initialValue = {
  email: '',
  password: '',
}

export default function LoginModal({ onClose, onSwitchToSignUp }: LoginModalProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, touched, getInputProps } = useForm({
    initialValue,
    validate: validateSignIn,
  })

  const isFormValid =
    Object.values(values).every((v) => v.trim() !== '') && Object.keys(errors).length === 0

  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)
    try {
      await login({ email: values.email, password: values.password })

      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      {/* 닫기 버튼 */}
      <img src={Cancel} alt="닫기" onClick={onClose} className="absolute right-2 z-50 m-4" />

      {/* 모달 안 */}
      <div className="m-8 flex flex-col items-center mt-20">
        {/* 아이콘 */}
        <div className="flex flex-col items-center mb-6">
          <img src={BrandLogo} alt="API Wiki 로고" className="w-20 h-22" />
          <h1 className="font-mono font-medium text-[45px] text-brand-500 tracking-[-3px] -mt-3">
            API Wiki
          </h1>
        </div>

        {/* 입력 영역 */}
        <form className="flex flex-col gap-5 mb-3">
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

          <ModalButton onClick={handleSubmit} disabled={!isFormValid || isLoading}>
            로그인
          </ModalButton>
        </form>

        {/* 하단 링크 */}
        <div
          className="flex text-xs text-[#BEBEBE] gap-2 mb-3 cursor-pointer"
          onClick={onSwitchToSignUp}
        >
          <span>회원가입</span>
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
