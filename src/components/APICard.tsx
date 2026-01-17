interface APICardProps {
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description?: string
  isDetail?: boolean
  isLarge?: boolean
}

export default function APICard({
  title,
  star,
  usedBy,
  price,
  iconUrl,
  description,
  isDetail = false,
  isLarge = false,
}: APICardProps) {
  // 캐러셀용 작은 카드는 w-[288px], 목록용 큰 카드는 w-[380px]로 고정
  const cardSize = isDetail ? 'w-[380px] h-[260px]' : 'w-[288px] h-[144px]'
  const btnSize = isLarge ? 'w-32 h-8' : 'w-28 h-7'

  return (
    <div className={`group relative ${cardSize} flex-shrink-0 cursor-pointer`}>
      {/* 수정됨: border-[0.25px] border-sky-500 삭제 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-white/20 rounded-2xl shadow-[1px_5px_10px_0px_rgba(33,150,243,0.25)]" />

      {/* 수정됨: border-[0.25px] border-sky-500 삭제 */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-[1px_5px_10px_0px_rgba(33,150,243,0.25)] transition-opacity duration-300 group-hover:opacity-0" />

      {/* 내부 패딩을 작은 카드는 p-4, 상세 카드는 p-6~7로 차등 적용 */}
      <div
        className={`relative h-full ${
          isDetail ? (isLarge ? 'p-7' : 'p-6') : 'p-4'
        } flex flex-col justify-center`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`${
              isDetail ? 'w-24 h-24' : 'w-16 h-16'
            } rounded-[10px] overflow-hidden flex-shrink-0 bg-white shadow-sm`}
          >
            {/* 위 div에서 border-[0.5px] border-sky-500 삭제함 */}
            <img src={iconUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-start pt-1">
            <h3
              className={`text-slate-900 font-semibold leading-tight ${
                isDetail ? 'text-xl mb-1' : 'text-base mb-0.5'
              }`}
            >
              {title}
            </h3>
            <p className="text-sky-900 text-sm font-medium">Star {star}</p>
            <p className="text-sky-900 text-sm">Used by {usedBy}</p>
            <p className="text-zinc-400 text-xs mt-0.5">{price}</p>
          </div>
        </div>

        {isDetail && description && (
          <div className="mt-4">
            <p className="text-slate-900 text-[13px] font-normal line-clamp-2 mb-4 leading-relaxed">
              {description}
            </p>
            <div
              className={`mx-auto ${btnSize} relative rounded-[20px] shadow-[0px_2px_4px_0px_rgba(33,150,243,0.25)] border border-sky-500 overflow-hidden cursor-pointer`}
            >
              <div className="w-full h-full bg-white flex items-center justify-center hover:bg-sky-500 group/btn transition-colors duration-300">
                <span className="text-sky-500 text-base font-medium group-hover/btn:text-white transition-colors duration-300">
                  compare
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
