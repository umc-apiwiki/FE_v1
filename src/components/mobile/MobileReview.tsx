import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface MobileReviewProps {
  name: string
  score: number
  text: string
  date: string
}

const MAX_SCORE = 5

export default function MobileReview({ name, score, text, date }: MobileReviewProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* 프로필 */}
      <div className="flex items-center gap-2 mb-3">
        <img src={profileImg} alt="사용자 프로필" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-semibold text-black text-sm">{name}</span>
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
