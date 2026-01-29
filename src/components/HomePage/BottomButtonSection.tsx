import ChevronUp from '@/assets/icons/action/ic_chevron_up.svg'
import ChevronDown from '@/assets/icons/action/ic_chevron_down.svg'

interface BottomButtonProps {
  onClick: () => void
  isExpanded: boolean
}

export default function BottomButtonSection({ onClick, isExpanded }: BottomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      // ★ 위치 수정: top-24 -> top-32 (약 128px)
      // 헤더와 겹치지 않고, 보내주신 이미지처럼 여백의 중간쯤에 위치하도록 내렸습니다.
      className={`fixed left-1/2 -translate-x-1/2 z-[9999] p-2 transition-all duration-500 ease-in-out focus:outline-none
        ${isExpanded ? 'top-32' : 'bottom-3'}
        ${!isExpanded && 'hover:-translate-y-1'}
      `}
    >
      <img
        src={isExpanded ? ChevronDown : ChevronUp}
        alt={isExpanded ? '접기' : '펼치기'}
        className="w-10 h-10 transition-opacity duration-300 object-contain"
      />
    </button>
  )
}
