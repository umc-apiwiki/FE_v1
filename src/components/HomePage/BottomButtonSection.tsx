import ChevronUp from '@/assets/icons/action/ic_chevron_up.svg'

export default function BottomButtomSection() {
  return (
    <button
      type="button"
      className="fixed bottom-3 hover:-translate-y-1 transition-all duration-200"
    >
      <img src={ChevronUp} alt="홈 스크롤" />
    </button>
  )
}
