import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface MobileReviewProps {
  reviewId: number
  name: string
  score: number
  text: string
  date: string
  isMine: boolean
  onDelete: (reviewId: number) => void
}

const MAX_SCORE = 5

export default function MobileReview({
  reviewId,
  name,
  score,
  text,
  date,
  isMine,
  onDelete,
}: MobileReviewProps) {
  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      onDelete(reviewId)
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* 프로필 */}
      <div className="flex items-center gap-2 mb-3">
        <img src={profileImg} alt="사용자 프로필" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-semibold text-black text-sm">{name}</span>
        {isMine && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="ml-auto text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
          >
            삭제
          </button>
        )}
      </div>

      {/* 별점 및 날짜 */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">
          {Array.from({ length: MAX_SCORE }).map((_, idx) => (
            <img
              key={idx}
              src={idx < score ? StarFilled : StarEmpty}
              alt={idx < score ? 'Filled star' : 'Empty star'}
              className="w-4 h-4"
            />
          ))}
        </div>
        <span className="text-[#6A6A6A] text-xs">{date}</span>
      </div>

      {/* 리뷰 본문 */}
      <p className="text-[#6A6A6A] text-sm leading-relaxed">{text}</p>
    </div>
  )
}
