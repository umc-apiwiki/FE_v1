import { useState } from 'react'
import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import { useNavigate } from 'react-router-dom'
import type { ApiPreview } from '@/types/api'

type APICardProps = ApiPreview & {
  onToggleFavorite?: (apiId: number) => void
}

const PRICING_LABEL: Record<string, string> = {
  FREE: 'Free',
  PAID: 'Paid',
  MIXED: 'Free & Paid',
}

const LOGO_BASE = 'https://api-wiki-api-logos.s3.ap-northeast-2.amazonaws.com/api-logos'

export default function APICard({
  apiId,
  name,
  summary,
  avgRating,
  reviewCount,
  viewCounts,
  pricingType,
  providerCompany,
  isFavorited,
  logo,
  onToggleFavorite,
}: APICardProps) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  // logo prop이 있으면 사용, 없으면 기본 경로 사용
  const logoUrl = logo ?? `${LOGO_BASE}/api_${apiId}.png`

  return (
    <div
      className="group relative w-96 h-64 flex-shrink-0 cursor-pointer"
      onClick={() => navigate(`/apis/${apiId}`)}
    >
      {/* 카드 배경 */}
      <div className="absolute inset-0 rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 group-hover:bg-gradient-to-b group-hover:from-brand-500/15 group-hover:to-white transition-all duration-300" />
      {/* 하트 */}
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(apiId)
          }}
          className="absolute top-3 right-4 z-10"
        >
          <img src={isFavorited ? HeartFill : HeartLine} alt={isFavorited ? '찜됨' : '찜 안됨'} />
        </button>
      </div>
      {/* 카드 내부 콘텐츠 */}
      <div className="relative p-8">
        <div className="flex items-start gap-4">
          {/* 아이콘 */}
          <div className="w-[116px] h-[108px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white shadow-[1px_4px_6px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 flex items-center justify-center">
            {!imgError ? (
              <img
                src={logoUrl}
                alt={name}
                className="w-full h-full object-contain p-2"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-brand-500 font-semibold text-3xl">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-start pl-8">
            <h3 className="text-info-darker font-medium leading-tight text-xl pb-4">{name}</h3>
            <p className="text-info-dark text-sm font-medium">Star {avgRating.toFixed(1)}</p>
            <p className="text-info-dark text-sm font-medium">
              {reviewCount} reviews · {viewCounts.toLocaleString()} views
            </p>
            <p className="text-[#B0B0B0] text-xs mt-0.5">
              {PRICING_LABEL[pricingType] ?? pricingType} · {providerCompany}
            </p>
          </div>
        </div>
        {/* 설명 */}
        <div className="mt-3">
          <p className="text-slate-900 text-[13px] font-medium line-clamp-2 mb-4 leading-snug">
            {summary}
          </p>
          <div className="mx-auto w-[133px] h-8 relative rounded-[20px] shadow-[0px_2px_4px_0px_rgba(33,150,243,0.25)] border border-sky-500 overflow-hidden cursor-pointer">
            <button
              type="button"
              className="w-full h-full bg-white flex items-center justify-center hover:bg-brand-500 group/btn transition-colors duration-300"
            >
              <span className="text-brand-500 text-xl font-medium group-hover/btn:text-white transition-colors duration-300 pb-1">
                compare
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
