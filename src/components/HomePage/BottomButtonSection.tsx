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
      className={`p-2 transition-all duration-500 ease-in-out focus:outline-none
        ${isExpanded ? 'relative' : 'fixed left-1/2 -translate-x-1/2 bottom-3 hover:-translate-y-1'}
        z-[9999]
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
