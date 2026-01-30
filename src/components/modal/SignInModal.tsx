import { useState } from 'react'
import Modal from '../modal/Modal'
import ModalInput from './components/ModalInput'
import ModalButton from './components/ModalButton'
import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'
import Cancel from '@/assets/icons/common/ic_cancel.svg'

type SignInModalProps = {
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignInModal({ onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Modal onClose={onClose}>
      {/* 닫기 버튼 */}
      <img src={Cancel} alt="닫기" onClick={onClose} className="absolute right-2 z-50 m-4" />
      {/* 모달 안 */}
      <div className="m-8 flex flex-col items-center mt-20">
        {/* 아이콘 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <img src={BrandLogo} alt="API Wiki 로고" className="w-20 h-22" />
          <h1 className="font-mono font-medium text-[45px] text-brand-500 tracking-[-3px] -mt-3">
            API Wiki
          </h1>
        </div>
        {/* Id + PW + 로그인 버튼 */}
        {/* 아이디 입력 */}
        <div className="flex flex-col gap-6 mb-3">
          <ModalInput
            type="Id"
            value={email}
            placeholder="아이디"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* 비밀번호 입력 */}
          <ModalInput
            type="Password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* 로그인 버튼 */}
          <ModalButton>로그인</ModalButton>
        </div>
        {/* 계정 찾기 및 회원가입 */}
        <div className="flex text-xs text-[#BEBEBE] gap-2 mb-3">
          <span>아이디 찾기</span>
          <div className="w-px h-3 bg-[#BEBEBE]  mt-1" />
          <span>비밀번호 찾기</span>
          <div className="w-px h-3 bg-[#BEBEBE]  mt-1" />
          <span onClick={onSwitchToSignUp} className="cursor-pointer">
            회원가입
          </span>
        </div>
        <div>
          <p className="flex text-center text-xs text-[#BEBEBE]">
            계속 진행할 경우 API WIKI의 이용약관에 동의하고 <br />
            개인정보 처리 방침을 이해하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </Modal>
  )
}
