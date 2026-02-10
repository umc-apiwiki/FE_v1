import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ApiPreview } from '@/types/api'

const PRICING_LABEL: Record<string, string> = {
  FREE: 'Free',
  PAID: 'Paid',
  MIXED: 'Free & Paid',
}

// ✅ [추가] 로고 이미지 기본 경로 (APICard와 동일하게 설정)
const LOGO_BASE = 'https://api-wiki-api-logos.s3.ap-northeast-2.amazonaws.com/api-logos'

export default function APICardSmall({
  apiId,
  name,
  avgRating,
  reviewCount,
  pricingType,
  logo, // ✅ [추가] logo prop 받기
}: ApiPreview) {
  const navigate = useNavigate()

  // ✅ [추가] 이미지 에러 처리를 위한 상태
  const [imgError, setImgError] = useState(false)

  // ✅ [추가] 로고 URL 생성 로직
  const logoUrl = logo ?? `${LOGO_BASE}/api_${apiId}.png`

  return (
    <div
      className="group relative w-full xs:w-[280px] sm:w-[300px] h-32 xs:h-36 flex-shrink-0 cursor-pointer"
      onClick={() => navigate(`/apis/${apiId}`)}
    >
      {/* 카드 배경 */}
      <div className="absolute inset-0 rounded-xl xs:rounded-[15px] border-brand-500/30 border-thin bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-brand-500/10 group-hover:to-white" />

      {/* 카드 내부 콘텐츠 */}
      <div className="relative pl-4 xs:pl-6 sm:pl-8 h-full flex items-center">
        <div className="flex gap-2 xs:gap-3 sm:gap-4 items-center">
          {/* ✅ [수정] 아이콘 표시 영역 */}
          <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-[70px] sm:h-[70px] rounded-lg xs:rounded-[10px] overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-sm">
            {!imgError ? (
              <img
                src={logoUrl}
                alt={name}
                className="w-full h-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-brand-500 font-semibold text-lg xs:text-xl sm:text-2xl">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-center pl-1 xs:pl-2 flex-1 min-w-0">
            <h3 className="text-info-darker font-medium leading-tight text-base xs:text-lg sm:text-xl pb-1 xs:pb-2 line-clamp-1">
              {name}
            </h3>
            <p className="text-xs xs:text-sm font-medium text-info-dark">
              Star {avgRating.toFixed(1)}
            </p>
            <p className="text-xs xs:text-sm font-medium text-info-dark">{reviewCount} reviews</p>
            <p className="text-[#B0B0B0] text-[10px] xs:text-xs mt-0.5">
              {PRICING_LABEL[pricingType] ?? pricingType}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
