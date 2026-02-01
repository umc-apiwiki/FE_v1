import Review from './Review'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface RatingData {
  score: number // 별점 (5, 4, 3, 2, 1)
  count: number // 해당 별점의 리뷰 개수
}

interface RatingSummary {
  averageScore: number // 평균 점수 (예: 4.7)
  totalCount: number // 전체 리뷰 개수 (예: 1022)
  ratings: RatingData[]
}
const MAX_SCORE = 5

function PartialStar({ ratio }: { ratio: number }) {
  return (
    <div className="relative w-6 h-6">
      {/* 바닥에 깔리는 빈 별 */}
      <img src={StarEmpty} className="absolute inset-0 w-6 h-6" />

      {/* 비율에 따라 너비가 결정되는 컨테이너 */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${ratio * 100}%` }}>
        {/* 채워진 별의 크기를 부모와 동일하게 고정하여 잘림 방지 */}
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

        if (diff >= 1) {
          return <img key={idx} src={StarFilled} className="w-6 h-6" />
        }

        if (diff > 0) {
          return <PartialStar key={idx} ratio={diff} />
        }

        return <img key={idx} src={StarEmpty} className="w-6 h-6" />
      })}
    </div>
  )
}

export default function ReviewSection() {
  const reviews = [
    {
      name: '홍길동',
      score: 5,
      text: '너무조아요 밥도 맛잇고 우양ㅇ냘어ㅑㅇㄴ멀아ㅣㄴ멀아ㅣㄴ멀;ㅏ인;머라인ㅁ;ㅓ라인;머라ㅣ;엄나ㅣ렁니마;ㅓㄹ아ㅣㄴ멀아ㅣㄴㅁ;ㅓㄹ이ㅏㄴ머라ㅣㅇ넘리ㅏ어마ㅣ;ㅓㅇ리ㅏㅁ;ㅓㄹ이ㅏㄴ;ㅓㅁ라ㅣ;러;ㅣㄴㅁ아ㅓㄹ;ㅏㅣㅇㅇㄴㅁㄹㅇㄴㄻㄴㅁ',
      date: '2026년 01월 30일',
    },
    { name: '김철수', score: 4, text: '괜찮아요, 만족합니다.', date: '2026년 01월 28일' },
    { name: '이영희', score: 3, text: '보통이에요, 기대보다는 아쉬움.', date: '2026년 01월 25일' },
  ]
  // 임시 데이터 정의
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

  return (
    <div>
      {/* 실사용자 후기 */}
      <div>
        <span className="font-medium text-info-darker text-[22px]">실사용자 후기</span>
      </div>
      {/* 별점 */}
      <div className="flex items-center h-60">
        {/* 별점 / 막대 그래프 */}
        <div className="flex gap-12 items-start w-full">
          {/* 별점 */}
          <div className="flex flex-col justify-center items-center h-full">
            {/* 평점 */}
            <span className="font-normal text-black text-[64px] leading-tight">
              {data.averageScore.toFixed(1)}
            </span>
            {/* 별 아이콘 */}
            <div className="mt-1">
              <StarRating score={data.averageScore} />
            </div>
            {/* 리뷰 갯수 */}
            <div>
              <span className="font-medium text-[#a4a4a4] text-[22px] leading-snug">
                {data.totalCount.toLocaleString()}개
              </span>
            </div>
          </div>
          {/* 막대 그래프 */}
          <div className="flex-1 flex flex-col gap-1">
            {data.ratings.map((item) => {
              // 백분율 계산 수행
              const percentage = (item.count / data.totalCount) * 100
              return (
                <div key={item.score} className="flex items-center gap-4">
                  {/* 별점 수치 표시 */}
                  <span className="text-xl font-medium text-black">{item.score}</span>
                  {/* 전체 바 배경 생성 */}
                  <div className="flex-1 h-4 bg-[#E8EAED] rounded-full overflow-hidden max-w-[945px]">
                    {/* 데이터 비중을 나타내는 유색 바 생성 */}
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
      {/* 리뷰 영역 */}
      <div className="flex flex-col gap-8">
        {reviews.map((review, index) => (
          <Review
            key={index}
            name={review.name}
            score={review.score}
            text={review.text}
            date={review.date}
          />
        ))}
      </div>
      {/* 리뷰 모두 보기 */}
      <div className="font-medium text-brand-500 text-[22px] mt-10 mb-10">리뷰 모두 보기</div>
    </div>
  )
}
