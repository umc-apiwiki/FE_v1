import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface ReviewProps {
  reviewId: number // [추가]
  name: string
  score: number
  text: string
  date: string
  isMine: boolean // [추가]
  onDelete: (reviewId: number) => void // [추가]
}

const MAX_SCORE = 5

export default function Review({
  reviewId,
  name,
  score,
  text,
  date,
  isMine,
  onDelete,
}: ReviewProps) {
  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      onDelete(reviewId)
    }
  }

  return (
    <div className="relative group max-w-[1112px]">
      {/* 프로필 - 디자인 유지 */}
      <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
        <img
          src={profileImg}
          alt="사용자 프로필"
          className="w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-full object-cover"
        />
        <span className="font-semibold text-black text-sm xs:text-base md:text-lg lg:text-[22px]">
          {name}
        </span>

        {/* 내 글일 경우 삭제 버튼 표시 */}
        {isMine && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="ml-auto text-xs xs:text-sm text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
          >
            삭제
          </button>
        )}
      </div>

      {/* 별점 및 날짜 - 디자인 유지 */}
      <div className="flex gap-2 xs:gap-3 mb-3 xs:mb-4 flex-wrap">
        <div className="flex gap-0.5 xs:gap-1">
          {Array.from({ length: MAX_SCORE }).map((_, idx) => (
            <img
              key={idx}
              src={idx < score ? StarFilled : StarEmpty}
              alt={idx < score ? 'Filled star' : 'Empty star'}
              className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6"
            />
          ))}
        </div>
        <div className="text-[#6A6A6A] text-xs xs:text-sm md:text-base lg:text-xl">{date}</div>
      </div>

      {/* 리뷰 본문 - 디자인 유지 */}
      <div className="font-normal text-[#6A6A6A] text-sm xs:text-base md:text-lg lg:text-xl max-w-[1112px] leading-relaxed">
        <p>{text}</p>
      </div>
    </div>
  )
}
