import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePostReview } from '@/hooks/usePostReview'
import Review from './Review'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface RatingData {
  score: number
  count: number
}

interface RatingSummary {
  averageScore: number
  totalCount: number
  ratings: RatingData[]
}

const MAX_SCORE = 5

function PartialStar({ ratio }: { ratio: number }) {
  return (
    <div className="relative w-6 h-6">
      <img src={StarEmpty} className="absolute inset-0 w-6 h-6" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${ratio * 100}%` }}>
        <img src={StarFilled} className="w-6 h-6 max-w-none" />
      </div>
    </div>
  )
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex">
      {Array.from({ length: MAX_SCORE }).map((_, idx) => {
        const diff = score - idx
        if (diff >= 1) return <img key={idx} src={StarFilled} className="w-6 h-6" />
        if (diff > 0) return <PartialStar key={idx} ratio={diff} />
        return <img key={idx} src={StarEmpty} className="w-6 h-6" />
      })}
    </div>
  )
}

export default function ReviewSection() {
  const { apiId } = useParams<{ apiId: string }>()
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const { createReview, isLoading } = usePostReview()

  /* reviewId와 isMine 여부를 포함한 데이터 예시 */
  const reviews = [
    {
      reviewId: 101,
      name: '홍길동',
      score: 5,
      text: '너무조아요 밥도 맛잇고 우양ㅇ냘어ㅑㅇㄴ멀아ㅣㄴ멀아ㅣㄴ멀;ㅏ인;머라인ㅁ;ㅓ라인;머라ㅣ;엄나ㅣ렁니마;ㅓㄹ아ㅣㄴ멀아ㅣㄴㅁ;ㅓㄹ이ㅏㄴ머라ㅣㅇ넘리ㅏ어마ㅣ;ㅓㅇ리ㅏㅁ;ㅓㄹ이ㅏㄴ;ㅓㅁ라ㅣ;러;ㅣㄴㅁ아ㅓㄹ;ㅏㅣㅇㅇㄴㅁㄹㅇㄴㄻㄴㅁ',
      date: '2026년 01월 30일',
      isMine: true, // 본인 리뷰 테스트용
    },
    {
      reviewId: 102,
      name: '김철수',
      score: 4,
      text: '괜찮아요, 만족합니다.',
      date: '2026년 01월 28일',
      isMine: false,
    },
    {
      reviewId: 103,
      name: '이영희',
      score: 3,
      text: '보통이에요, 기대보다는 아쉬움.',
      date: '2026년 01월 25일',
      isMine: false,
    },
  ]

  const data: RatingSummary = {
    averageScore: 4.7,
    totalCount: 1022,
    ratings: [
      { score: 5, count: 800 },
      { score: 4, count: 150 },
      { score: 3, count: 40 },
      { score: 2, count: 20 },
      { score: 1, count: 12 },
    ],
  }

  const handleSubmit = () => {
    if (!newReview.comment.trim()) {
      alert('리뷰 내용을 입력해주세요.')
      return
    }
    if (!apiId) return
    createReview(Number(apiId), newReview, () => {
      alert('리뷰가 등록되었습니다.')
      setNewReview({ rating: 5, comment: '' })
    })
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <span className="font-medium text-info-darker text-[22px]">실사용자 후기</span>
      </div>

      <div className="flex items-center h-60 mb-10">
        <div className="flex gap-12 items-start w-full">
          <div className="flex flex-col justify-center items-center h-full">
            <span className="font-normal text-black text-[64px] leading-tight">
              {data.averageScore.toFixed(1)}
            </span>
            <div className="mt-1">
              <StarRating score={data.averageScore} />
            </div>
            <div>
              <span className="font-medium text-[#a4a4a4] text-[22px] leading-snug">
                {data.totalCount.toLocaleString()}개
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {data.ratings.map((item) => {
              const percentage = (item.count / data.totalCount) * 100
              return (
                <div key={item.score} className="flex items-center gap-4">
                  <span className="text-xl font-medium text-black">{item.score}</span>
                  <div className="flex-1 h-4 bg-[#E8EAED] rounded-full overflow-hidden max-w-[945px]">
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

      <div className="w-full max-w-[1140px] border border-brand-500 rounded-xl bg-white overflow-hidden p-6 mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="font-sans font-medium text-lg text-info-dark">리뷰 남기기</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => setNewReview({ ...newReview, rating: idx + 1 })}
              >
                <img
                  src={idx < newReview.rating ? StarFilled : StarEmpty}
                  className={`w-7 h-7 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-500 resize-none text-base disabled:bg-gray-50 transition-colors"
          placeholder={isLoading ? '등록 중입니다...' : '이 API에 대한 솔직한 후기를 남겨주세요.'}
          value={newReview.comment}
          disabled={isLoading}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md disabled:bg-gray-400"
          >
            {isLoading ? '등록 중...' : '리뷰 저장하기'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <Review
            key={review.reviewId} // index 대신 고유 ID 사용
            reviewId={review.reviewId}
            name={review.name}
            score={review.score}
            text={review.text}
            date={review.date}
            isMine={review.isMine} // 본인 여부 전달
          />
        ))}
      </div>

      <div className="font-medium text-brand-500 text-[22px] mt-10 mb-10 cursor-pointer">
        리뷰 모두 보기
      </div>
    </div>
  )
}
