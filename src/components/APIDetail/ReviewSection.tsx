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
    <div className="relative w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6">
      <img src={StarEmpty} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${ratio * 100}%` }}>
        <img src={StarFilled} className="w-full h-full max-w-none" />
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
          return <img key={idx} src={StarFilled} className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" />
        if (diff > 0) return <PartialStar key={idx} ratio={diff} />
        return <img key={idx} src={StarEmpty} className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" />
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
      <div className="mb-4 xs:mb-5 md:mb-6">
        <span className="font-medium text-info-darker text-base xs:text-lg md:text-xl lg:text-[22px]">
          실사용자 후기
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center h-auto md:h-60 mb-6 xs:mb-8 md:mb-10">
        <div className="flex gap-6 xs:gap-8 md:gap-12 items-start w-full flex-col md:flex-row">
          <div className="flex flex-row md:flex-col justify-start md:justify-center items-center md:h-full gap-4 md:gap-0 w-full md:w-auto">
            <span className="font-normal text-black text-3xl xs:text-4xl md:text-5xl lg:text-[64px] leading-tight">
              {data.averageScore.toFixed(1)}
            </span>
            <div className="mt-0 md:mt-1">
              <StarRating score={data.averageScore} />
            </div>
            <div>
              <span className="font-medium text-[#a4a4a4] text-sm xs:text-base md:text-lg lg:text-[22px] leading-snug">
                {data.totalCount.toLocaleString()}개
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 xs:gap-1.5 md:gap-2 w-full">
            {data.ratings.map((item) => {
              const percentage = (item.count / data.totalCount) * 100
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
                disabled={isLoading}
                onClick={() => setNewReview({ ...newReview, rating: idx + 1 })}
              >
                <img
                  src={idx < newReview.rating ? StarFilled : StarEmpty}
                  className={`w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full h-24 xs:h-28 md:h-32 p-3 xs:p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-500 resize-none text-sm xs:text-base disabled:bg-gray-50 transition-colors"
          placeholder={isLoading ? '등록 중입니다...' : '이 API에 대한 솔직한 후기를 남겨주세요.'}
          value={newReview.comment}
          disabled={isLoading}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex justify-end gap-2 xs:gap-3 mt-3 xs:mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 xs:px-5 md:px-6 py-1.5 xs:py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md disabled:bg-gray-400 text-xs xs:text-sm md:text-base"
          >
            {isLoading ? '등록 중...' : '리뷰 저장하기'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 xs:gap-7 md:gap-8">
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

      <div className="font-medium text-brand-500 text-sm xs:text-base md:text-lg lg:text-[22px] mt-6 xs:mt-8 md:mt-10 mb-6 xs:mb-8 md:mb-10 cursor-pointer">
        리뷰 모두 보기
      </div>
    </div>
  )
}
