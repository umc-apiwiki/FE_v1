import { useState } from 'react'
import Modal from '../modal/Modal'
import ModalInput from './components/ModalInput'
import ModalButton from './components/ModalButton'
import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'

type SignUpModalProps = {
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUpModal({ onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <Modal onClose={onClose}>
      {/* 닫기 버튼 */}
      <img src={Cancel} alt="닫기" onClick={onClose} className="absolute right-2 z-50 m-4" />
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
          <ModalInput
            type="text"
            value={nickname}
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          />
          {/* 이메일 입력 */}
          <ModalInput
            type="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* 비밀번호 입력 */}
          <ModalInput
            type="Password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* 비밀번호 확인 입력 */}
          <ModalInput
            type="Password"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <ModalButton>회원가입</ModalButton>
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
