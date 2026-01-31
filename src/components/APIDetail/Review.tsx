import profileImg from '@/assets/default_profile.png'
import StarFilled from '@/assets/icons/common/ic_star_filled.svg'
import StarEmpty from '@/assets/icons/common/ic_star_empty.svg'

interface ReviewProps {
  name: string
  score: number
  text: string
  date: string
}
const MAX_SCORE = 5

export default function Review({ name, score, text, date }: ReviewProps) {
  return (
    <div>
      {/* 프로필 */}
      <div className="flex items-center h-full gap-3 mb-3">
        <img
          src={profileImg}
          alt="사용자 프로필"
          className="w-14 h-14 rounded-full object-cover "
        />
        <span className="font-semibold text-black text-[22px]">{name}</span>
      </div>
      {/* 별점 및 날짜 */}
      <div className="flex gap-3 mb-4">
        {/* 별점 */}
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
        {/* 날짜 */}
        <div className="text-[#6A6A6A] text-xl">{date}</div>
      </div>
      {/* 리뷰 */}
      <div className="font-normal text-[#6A6A6A] text-xl max-w-[1112px] mb-3 leading-tight">
        <p>{text}</p>
      </div>
      {/* 이 리뷰가 유용했나요? */}
      <div className="flex gap-4">
        <span className="font-normal text-[#b0b0b0] text-xl">이 리뷰가 유용했나요?</span>
        {/* 예/ 아니요 */}
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
