interface APICardProps {
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description?: string
}

export default function APICardSmall({ title, star, usedBy, price, iconUrl }: APICardProps) {
  return (
    <div className="group relative w-[300px] h-36 flex-shrink-0 cursor-pointer">
      {/* 카드 배경(테두리 + 그림자 + 배경색) */}
      <div className="absolute inset-0 rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25" />

      {/* 카드 내부 콘텐츠 영역 */}
      <div className="relative pl-8">
        {/* 아이콘과 텍스트가 가로로 배치되는 영역 */}
        <div className="flex gap-4 h-36">
          {/* 아이콘 이미지 박스 */}
          <div className="flex items-center justify-center flex-shrink-0">
            <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white border border-brand-500/50">
              {/* 아이콘 이미지 */}
              <img src={iconUrl} alt={title} />
            </div>
          </div>

          {/* 텍스트 정보 영역 (세로 정렬) */}
          <div className="flex flex-col justify-center pl-2">
            <h3 className="text-[#071E31] font-medium leading-tight text-xl pb-2">{title}</h3>
            <p className="text-sm font-medium">Star {star}</p>
            <p className="text-sm font-medium">Used by {usedBy}</p>
            <p className="text-[#B0B0B0] text-xs mt-0.5">{price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
