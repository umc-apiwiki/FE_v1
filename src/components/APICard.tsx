import { useState } from 'react'
import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import { useNavigate } from 'react-router-dom'
import type { ApiPreview } from '@/types/api'

type APICardProps = ApiPreview & {
  onToggleFavorite?: (apiId: number) => void
  onToggleCompare?: (api: ApiPreview) => void
  isInCompare?: boolean
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
  authType,
  providerCompany,
  isFavorited,
  logo,
  onToggleFavorite,
  onToggleCompare,
  isInCompare = false,
}: APICardProps) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  /* 로고 경로 결정 */
  const logoUrl = logo ?? `${LOGO_BASE}/api_${apiId}.png`

  /* 비교 데이터 객체 */
  const apiData: ApiPreview = {
    apiId,
    name,
    summary,
    avgRating,
    reviewCount,
    viewCounts,
    pricingType,
    authType,
    providerCompany,
    isFavorited,
    logo,
  }

  return (
    <div
      className="group relative w-96 h-64 flex-shrink-0 cursor-pointer"
      onClick={() => navigate(`/apis/${apiId}`)}
    >
      {/* 카드 배경 */}
      <div className="absolute inset-0 rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 group-hover:bg-gradient-to-b group-hover:from-brand-500/15 group-hover:to-white transition-all duration-300" />

      {/* 하트 버튼 - 위치 고정 */}
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

      {/* 아이콘 영역 - 위치 고정 */}
      <div className="absolute top-8 left-8 w-[116px] h-[108px] rounded-[10px] overflow-hidden bg-white shadow-[1px_4px_6px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 flex items-center justify-center">
        {!imgError ? (
          <img
            src={logoUrl}
            alt={name}
            className="w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-brand-500 font-semibold text-3xl">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* 상단 텍스트 정보 - 위치 고정 */}
      <div className="absolute top-9 left-[190px] right-8 flex flex-col items-start">
        {/* 제목 섹션 */}
        <h3 className="w-full text-info-darker font-medium leading-none text-xl">{name}</h3>

        {/* 상세 정보 섹션 */}
        <div className="absolute top-10">
          <p className="text-info-dark text-sm font-medium">Star {avgRating.toFixed(1)}</p>
          <p className="text-info-dark text-sm font-medium">{viewCounts.toLocaleString()} views</p>
          <p className="text-[#B0B0B0] text-xs mt-1">{PRICING_LABEL[pricingType] ?? pricingType}</p>
        </div>
      </div>

      {/* 설명 영역 - 위치 고정 */}
      <div className="absolute top-[155px] left-8 right-8">
        <p className="text-slate-900 text-[14px] font-medium line-clamp-2 leading-snug">
          {summary}
        </p>
      </div>

      {/* compare 버튼 - 위치 고정 (중앙 하단) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[133px] h-8 rounded-[20px] shadow-[0px_2px_4px_0px_rgba(33,150,243,0.25)] border border-sky-500 overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleCompare?.(apiData)
          }}
          className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
            isInCompare
              ? 'bg-brand-500 hover:bg-brand-600'
              : 'bg-white hover:bg-brand-500 group/btn'
          }`}
        >
          <span
            className={`text-xl font-medium transition-colors duration-300 pb-1 ${
              isInCompare ? 'text-white' : 'text-brand-500 group-hover/btn:text-white'
            }`}
          >
            {isInCompare ? '비교중' : 'compare'}
          </span>
        </button>
      </div>
    </div>
  )
}
