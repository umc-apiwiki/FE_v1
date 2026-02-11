import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useReviews, usePostReview, useAuth } from '@/hooks'
import { useDeleteReview } from '@/hooks/mutations/useDeleteReview'
import { useMyProfile } from '@/hooks/useUser'

import Review from './Review'
import Pagination from '@/components/Pagination'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

const MAX_SCORE = 5

// createReview 결과 처리를 위한 타입 정의
interface CreateReviewResult {
  success?: boolean
  rating?: number
  error?: string
  message?: string
}

function PartialStar({ ratio }: { ratio: number }) {
  return (
    <div className="relative w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6">
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
        if (diff >= 1)
          return (
            <img
              key={idx}
              src={StarFilled}
              className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6"
              alt="별"
            />
          )
        if (diff > 0) return <PartialStar key={idx} ratio={diff} />
        return (
          <img key={idx} src={StarEmpty} className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" alt="별" />
        )
      })}
    </div>
  )
}

export default function ReviewSection() {
  const { id } = useParams<{ id: string }>()
  const apiId = Number(id) || 0
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const { accessToken } = useAuth()

  const { profile } = useMyProfile()
  const { mutate: deleteReview, isLoading: isDeleting } = useDeleteReview()

  const {
    data: reviewData,
    isLoading: reviewsLoading,
    refresh,
    currentPage,
    goToPage,
  } = useReviews(apiId, 0)

  const { createReview, isLoading: postLoading } = usePostReview()

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
    if (!accessToken) {
      alert('로그인이 필요한 기능입니다. 로그인 후 이용해주세요.')
      return
    }

    if (!newReview.comment.trim()) {
      alert('리뷰 내용을 입력해주세요.')
      return
    }
    if (!apiId || apiId === 0) return

    // any 대신 타입 단언 사용
    const result = (await createReview(apiId, newReview)) as CreateReviewResult

    if (result && (result.success || result.rating)) {
      alert('리뷰가 등록되었습니다.')
      setNewReview({ rating: 5, comment: '' })
      refresh()
    } else {
      const errorMessage = result?.error || result?.message || '리뷰 등록에 실패했습니다.'
      alert(errorMessage)
    }
  }

  const handleDelete = async (reviewId: number) => {
    if (!reviewId || reviewId === 0) {
      alert('리뷰 정보 오류: 삭제할 ID가 없습니다.')
      return
    }

    if (isDeleting) return

    try {
      const result = await deleteReview(apiId, reviewId)

      if (result.isSuccess) {
        alert('리뷰가 삭제되었습니다.')
        refresh()
      } else {
        alert(result.message)
      }
    } catch (error) {
      // [수정 포인트] 에러 변수(error)를 콘솔에 찍어서 '사용' 상태로 만듦 -> 린트 에러 해결!
      console.error('리뷰 삭제 중 오류:', error)
      alert('오류가 발생했습니다.')
    }
  }

  const totalRating = reviewData?.totalRating ?? 0
  const reviewCount = reviewData?.reviewCount ?? 0
  const reviewList = reviewData?.reviews.content ?? []
  const totalPages = reviewData?.reviews.totalPage ?? 0

  return (
    <div className="flex flex-col">
      <div className="mb-4 xs:mb-5 md:mb-6">
        <span className="font-medium text-info-darker text-base xs:text-lg md:text-xl lg:text-[22px]">
          실사용자 후기
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center h-auto md:h-60 mb-6 xs:mb-8 md:mb-10">
        <div className="flex gap-6 xs:gap-8 md:gap-12 items-start w-full flex-col md:flex-row">
          <div className="flex flex-row md:flex-col justify-start md:justify-center items-center md:h-full gap-4 md:gap-0 w-full md:w-auto">
            <span className="font-normal text-black text-3xl xs:text-4xl md:text-5xl lg:text-[64px] leading-tight">
              {totalRating.toFixed(1)}
            </span>
            <div className="mt-0 md:mt-1">
              <StarRating score={totalRating} />
            </div>
            <div>
              <span className="font-medium text-[#a4a4a4] text-sm xs:text-base md:text-lg lg:text-[22px] leading-snug">
                {reviewCount.toLocaleString()}개
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 xs:gap-1.5 md:gap-2 w-full">
            {ratingDistribution.map((item) => {
              const percentage = reviewCount > 0 ? (item.count / reviewCount) * 100 : 0
              return (
                <div key={item.score} className="flex items-center gap-2 xs:gap-3 md:gap-4">
                  <span className="text-sm xs:text-base md:text-lg lg:text-xl font-medium text-black min-w-[1rem]">
                    {item.score}
                  </span>
                  <div className="flex-1 h-3 xs:h-3.5 md:h-4 bg-[#E8EAED] rounded-full overflow-hidden max-w-[945px]">
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
      </div>

      <div className="w-full max-w-[1140px] border border-brand-500 rounded-xl bg-white overflow-hidden p-3 xs:p-4 md:p-6 mb-8 xs:mb-10 md:mb-12">
        <div className="flex justify-between items-center mb-3 xs:mb-4">
          <span className="font-sans font-medium text-sm xs:text-base md:text-lg text-info-dark">
            리뷰 남기기
          </span>
          <div className="flex gap-0.5 xs:gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                disabled={postLoading}
                onClick={() => setNewReview({ ...newReview, rating: idx + 1 })}
              >
                <img
                  src={idx < newReview.rating ? StarFilled : StarEmpty}
                  className={`w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 ${postLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  alt="별점"
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full h-24 xs:h-28 md:h-32 p-3 xs:p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-500 resize-none text-sm xs:text-base disabled:bg-gray-50 transition-colors"
          placeholder={postLoading ? '등록 중입니다...' : '이 API에 대한 솔직한 후기를 남겨주세요.'}
          value={newReview.comment}
          disabled={postLoading}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex justify-end gap-2 xs:gap-3 mt-3 xs:mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={postLoading}
            className="px-4 xs:px-5 md:px-6 py-1.5 xs:py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md disabled:bg-gray-400 text-xs xs:text-sm md:text-base"
          >
            {postLoading ? '등록 중...' : '리뷰 저장하기'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 xs:gap-7 md:gap-8">
        {reviewsLoading && !reviewData ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-500">리뷰를 불러오는 중...</p>
          </div>
        ) : reviewList.length > 0 ? (
          reviewList.map((review) => (
            <Review
              key={`${review.nickname}-${review.createdAt}`}
              reviewId={review.reviewId || 0}
              name={review.nickname}
              score={Math.floor(review.rating)}
              text={review.comment}
              date={new Date(review.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              isMine={!!(profile?.nickname && profile.nickname === review.nickname)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex justify-center items-center min-h-[200px] text-gray-400">
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
          className="mt-8 xs:mt-10 md:mt-12"
        />
      )}
    </div>
  )
}
