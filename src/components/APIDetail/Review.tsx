import { useParams } from 'react-router-dom'
import { useDeleteReview } from '@/hooks/useDeleteReview'
import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface ReviewProps {
  reviewId: number // 삭제를 위해 ID 추가
  name: string
  score: number
  text: string
  date: string
  isMine?: boolean // 본인 리뷰 여부 확인용
}

const MAX_SCORE = 5

export default function Review({ reviewId, name, score, text, date, isMine }: ReviewProps) {
  const { apiId } = useParams<{ apiId: string }>()
  const { removeReview, isLoading } = useDeleteReview()

  /* 삭제 핸들러 */
  const handleDelete = () => {
    if (!apiId) return
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      removeReview(Number(apiId), reviewId, () => {
        alert('리뷰가 삭제되었습니다.')
        // 삭제 후 목록 갱신 로직 필요 (예: window.location.reload() 또는 상태 업데이트)
      })
    }
  }

  return (
    <div className="relative group max-w-[1112px]">
      {/* 프로필 및 삭제 버튼 */}
      <div className="flex items-center justify-between mb-2 xs:mb-3">
        <div className="flex items-center gap-2 xs:gap-3">
          <img
            src={profileImg}
            alt="사용자 프로필"
            className="w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <span className="font-semibold text-black text-sm xs:text-base md:text-lg lg:text-[22px]">
            {name}
          </span>
        </div>

        {/* 본인 리뷰일 때만 삭제 버튼 표시 */}
        {isMine && (
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-500 text-sm xs:text-base md:text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </button>
        )}
      </div>

      {/* 별점 및 날짜 */}
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

      {/* 리뷰 본문 */}
      <div className="font-normal text-[#6A6A6A] text-sm xs:text-base md:text-lg lg:text-xl max-w-[1112px] mb-3 leading-relaxed">
        <p>{text}</p>
      </div>

      {/* 피드백 영역 */}
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4">
        <span className="font-normal text-[#b0b0b0] text-xs xs:text-sm md:text-base lg:text-xl">
          이 리뷰가 유용했나요?
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-[26px] xs:h-[28px] md:h-[30px] w-auto px-3 xs:px-3.5 md:px-4 font-normal text-info-dark text-xs xs:text-sm md:text-base lg:text-xl hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            예
          </button>
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-[26px] xs:h-[28px] md:h-[30px] w-auto px-3 xs:px-3.5 md:px-4 font-normal text-info-dark text-xs xs:text-sm md:text-base lg:text-xl hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  )
}
