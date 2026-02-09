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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={profileImg}
            alt="사용자 프로필"
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="font-semibold text-black text-[22px]">{name}</span>
        </div>

        {/* 본인 리뷰일 때만 삭제 버튼 표시 */}
        {isMine && (
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-500 text-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </button>
        )}
      </div>

      {/* 별점 및 날짜 */}
      <div className="flex gap-3 mb-4">
        <div className="flex gap-1 text-xl">
          {Array.from({ length: MAX_SCORE }).map((_, idx) => (
            <img
              key={idx}
              src={idx < score ? StarFilled : StarEmpty}
              alt={idx < score ? 'Filled star' : 'Empty star'}
              className="w-6"
            />
          ))}
        </div>
        <div className="text-[#6A6A6A] text-xl">{date}</div>
      </div>

      {/* 리뷰 본문 */}
      <div className="font-normal text-[#6A6A6A] text-xl max-w-[1112px] mb-3 leading-tight">
        <p>{text}</p>
      </div>

      {/* 피드백 영역 */}
      <div className="flex gap-4">
        <span className="font-normal text-[#b0b0b0] text-xl">이 리뷰가 유용했나요?</span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-[30px] w-auto px-4 font-normal text-info-dark text-xl hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            예
          </button>
          <button
            type="button"
            className="rounded-full border border-info-dark/70 bg-white h-[30px] w-auto px-4 font-normal text-info-dark text-xl hover:bg-info-dark hover:text-white transition-colors duration-200"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  )
}
