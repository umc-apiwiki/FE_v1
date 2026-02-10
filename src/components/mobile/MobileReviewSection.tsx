import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useReviews, usePostReview, useAuth } from '@/hooks'
import MobileReview from './MobileReview'
import Pagination from '@/components/Pagination'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

const MAX_SCORE = 5

function PartialStar({ ratio }: { ratio: number }) {
  return (
    <div className="relative w-5 h-5">
      <img src={StarEmpty} className="absolute inset-0 w-full h-full" alt="별" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${ratio * 100}%` }}>
        <img src={StarFilled} className="w-full h-full max-w-none" alt="별" />
      </div>
    </div>
  )
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: MAX_SCORE }).map((_, idx) => {
        const diff = score - idx
        if (diff >= 1) return <img key={idx} src={StarFilled} className="w-5 h-5" alt="별" />
        if (diff > 0) return <PartialStar key={idx} ratio={diff} />
        return <img key={idx} src={StarEmpty} className="w-5 h-5" alt="별" />
      })}
    </div>
  )
}

export default function MobileReviewSection() {
  const { id } = useParams<{ id: string }>()
  const apiId = Number(id) || 0
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const { accessToken } = useAuth()

  /* API 데이터 불러오기 */
  const {
    data: reviewData,
    isLoading: reviewsLoading,
    refresh,
    currentPage,
    goToPage,
  } = useReviews(apiId, 0)

  const { createReview, isLoading: postLoading } = usePostReview()

  /* 평점 분포 계산 (useMemo로 변경) */
  const ratingDistribution = useMemo(() => {
    if (!reviewData?.reviews.content) return []

    return [5, 4, 3, 2, 1].map((score) => {
      const count = reviewData.reviews.content.filter(
        (review) => Math.floor(review.rating) === score
      ).length
      return { score, count }
    })
  }, [reviewData])

  const handleSubmit = async () => {
    /* 로그인 체크 */
    if (!accessToken) {
      alert('로그인이 필요한 기능입니다. 로그인 후 이용해주세요.')
      return
    }

    if (!newReview.comment.trim()) {
      alert('리뷰 내용을 입력해주세요.')
      return
    }
    if (!apiId || apiId === 0) return

    const result = await createReview(apiId, newReview)

    if (result?.success) {
      alert('리뷰가 등록되었습니다.')
      setNewReview({ rating: 5, comment: '' })
      refresh()
    } else if (result?.error) {
      alert(result.error)
    }
  }

  /* 데이터 기본값 설정 */
  const totalRating = reviewData?.totalRating ?? 0
  const reviewCount = reviewData?.reviewCount ?? 0
  const reviewList = reviewData?.reviews.content ?? []
  const totalPages = reviewData?.reviews.totalPage ?? 0

  return (
    <div className="flex flex-col px-4 py-6">
      <div className="mb-4">
        <span className="font-bold text-info-darker text-lg">실사용자 후기</span>
      </div>

      {/* 평점 요약 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-black text-3xl">{totalRating.toFixed(1)}</span>
            <StarRating score={totalRating} />
            <span className="text-[#a4a4a4] text-sm">{reviewCount.toLocaleString()}개</span>
          </div>
        </div>

        {/* 평점 분포 */}
        <div className="flex flex-col gap-2">
          {ratingDistribution.map((item) => {
            const percentage = reviewCount > 0 ? (item.count / reviewCount) * 100 : 0
            return (
              <div key={item.score} className="flex items-center gap-2">
                <span className="text-sm font-medium text-black min-w-[1rem]">{item.score}</span>
                <div className="flex-1 h-3 bg-[#E8EAED] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3B82F6] rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 리뷰 작성 폼 */}
      <div className="border border-brand-500 rounded-lg bg-white p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-sm text-info-dark">리뷰 남기기</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                disabled={postLoading}
                onClick={() => setNewReview({ ...newReview, rating: idx + 1 })}
              >
                <img
                  src={idx < newReview.rating ? StarFilled : StarEmpty}
                  className={`w-6 h-6 ${postLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  alt="별점"
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-500 resize-none text-sm disabled:bg-gray-50 transition-colors"
          placeholder={postLoading ? '등록 중입니다...' : '이 API에 대한 솔직한 후기를 남겨주세요.'}
          value={newReview.comment}
          disabled={postLoading}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={postLoading}
            className="px-4 py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md disabled:bg-gray-400 text-sm"
          >
            {postLoading ? '등록 중...' : '리뷰 저장하기'}
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="flex flex-col gap-4">
        {reviewsLoading && !reviewData ? (
          <div className="flex justify-center items-center min-h-[150px]">
            <p className="text-gray-500 text-sm">리뷰를 불러오는 중...</p>
          </div>
        ) : reviewList.length > 0 ? (
          reviewList.map((review) => (
            <MobileReview
              key={`${review.nickname}-${review.createdAt}`}
              name={review.nickname}
              score={Math.floor(review.rating)}
              text={review.comment}
              date={new Date(review.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          ))
        ) : (
          <div className="flex justify-center items-center min-h-[150px] text-gray-400 text-sm">
            <p>아직 등록된 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          className="mt-6"
        />
      )}
    </div>
  )
}
