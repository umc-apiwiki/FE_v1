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
    <div className="relative group max-w-[1112px]">
      {/* 프로필 */}
      <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
        <img
          src={profileImg}
          alt="사용자 프로필"
          className="w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-full object-cover"
        />
        <span className="font-semibold text-black text-sm xs:text-base md:text-lg lg:text-[22px]">
          {name}
        </span>
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
      <div className="font-normal text-[#6A6A6A] text-sm xs:text-base md:text-lg lg:text-xl max-w-[1112px] leading-relaxed">
        <p>{text}</p>
      </div>
    </div>
  )
}
