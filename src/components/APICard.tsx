import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import { useState } from 'react'


interface APICardProps {
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description?: string
}

export default function APICard({
  title,
  star,
  usedBy,
  price,
  iconUrl,
  description,
}: APICardProps) {
  const [isLike, setIsLike] = useState(false)
  return (
    <div className="group relative w-96 h-64 flex-shrink-0 cursor-pointer ">
      {/* 카드 배경(테두리 + 그림자 + 배경색) */}
      <div className="absolute inset-0 rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 group-hover:bg-gradient-to-b group-hover:from-brand-500/15 group-hover:to-white transition-all duration-300" />
      {/* 하트 */}
      <div className='relative'>
        <button type='button' onClick={() => setIsLike(prev => !prev)} className='absolute top-3 right-4 z-10'>
          <img src={isLike ? HeartFill : HeartLine}
            alt={isLike ? '찜됨' : '찜 안됨'}/>
        </button>
      </div>
      {/* 카드 내부 콘텐츠 영역 */}
      <div className="relative p-8">
        
        {/* 아이콘과 텍스트가 가로로 배치되는 영역 */}
        <div className="flex items-start gap-4">
          {/* 아이콘 이미지 박스 (고정 크기, 그림자, 테두리 적용) */}
          <div
            className="w-[116px] h-[108px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white shadow-[1px_4px_6px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25"
          >
            {/* 아이콘 이미지 */}
            <img src={iconUrl} alt={title} />
          </div>

          {/* 텍스트 정보 영역 (세로 정렬) */}
          <div className="flex flex-col justify-start pl-8">
            <h3
              className="text-[#071E31] font-medium leading-tight text-xl pb-4"
            >
              {title}
            </h3>
            <p className="text-[#0D3C61] text-sm font-medium">Star {star}</p>
            <p className="text-[#0D3C61] text-sm font-medium">Used by {usedBy}</p>
            <p className="text-[#B0B0B0] text-xs mt-0.5">{price}</p>
          </div>
        </div>
        {/* 상세 정보 */}
        <div className="mt-3">
          <p className="text-slate-900 text-[13px] font-medium line-clamp-2 mb-4 leading-snug">
            {description}
          </p>
          <div
            className="mx-auto w-[133px] h-8 relative rounded-[20px] shadow-[0px_2px_4px_0px_rgba(33,150,243,0.25)] border border-sky-500 overflow-hidden cursor-pointer"
          >
            {/* compare 버튼 */}
            <div className="w-full h-full bg-white flex items-center justify-center hover:bg-brand-500 group/btn transition-colors duration-300">
              <span className="text-brand-500 text-xl font-medium group-hover/btn:text-white transition-colors duration-300 pb-1">
                compare
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
