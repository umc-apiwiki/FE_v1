/**
 * MobileAPICard 컴포넌트
 * 모바일 환경에서 API 카드를 표시
 * ApiPreview 타입과 호환되도록 수정
 */

import { Link } from 'react-router-dom'
import type { ApiPreview } from '../../types/api'

type MobileAPICardProps = {
  api: ApiPreview
}

const LOGO_BASE = 'https://api-wiki-api-logos.s3.ap-northeast-2.amazonaws.com/api-logos'

export const MobileAPICard = ({ api }: MobileAPICardProps) => {
  // 로고 URL 결정 (prop이 있으면 사용, 없으면 기본 경로)
  const logoUrl = api.logo ?? `${LOGO_BASE}/api_${api.apiId}.png`

  // 조회수 포맷팅
  const formatViews = (views?: number) => {
    if (!views) return '0'
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  // 가격 타입 포맷팅
  const formatPrice = (pricingType?: string) => {
    switch (pricingType) {
      case 'FREE':
        return 'FREE'
      case 'PAID':
        return 'PAID'
      case 'MIXED':
        return 'FREE & PAID'
      default:
        return 'FREE'
    }
  }

  // 가격 타입에 따른 배지 스타일
  const getPriceBadgeStyle = (pricingType?: string) => {
    switch (pricingType) {
      case 'FREE':
        return 'bg-green-100 text-green-700'
      case 'PAID':
        return 'bg-blue-100 text-blue-700'
      case 'MIXED':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-green-100 text-green-700'
    }
  }

  return (
    <Link
      to={`/apis/${api.apiId}`}
      className="block w-full bg-white rounded-xl shadow-sm border border-blue-500 transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="p-4">
        {/* Top Section: Image and Info */}
        <div className="flex gap-4 items-start">
          {/* Logo Image */}
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={logoUrl}
              alt={api.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <span className="text-3xl hidden">📦</span>
          </div>

          {/* Right Info Column */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="mb-2">
              <h3 className="text-base font-semibold text-gray-900 truncate">{api.name}</h3>
            </div>

            {/* Metadata Group */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Rating */}
              {api.avgRating !== undefined && api.avgRating > 0 && (
                <div className="flex items-center gap-1 text-yellow-600">
                  <span className="text-sm">★</span>
                  <span className="font-medium">{api.avgRating.toFixed(1)}</span>
                </div>
              )}

              {/* Review Count */}
              {api.reviewCount !== undefined && api.reviewCount > 0 && (
                <span className="text-gray-500">{api.reviewCount} reviews</span>
              )}

              {/* View Count */}
              {api.viewCounts !== undefined && api.viewCounts > 0 && (
                <span className="text-gray-500">{formatViews(api.viewCounts)} views</span>
              )}

              {/* Paid/Free Badge */}
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${getPriceBadgeStyle(api.pricingType)}`}
              >
                {formatPrice(api.pricingType)}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {api.summary && (
          <div className="mt-3 text-sm text-gray-600 line-clamp-2">{api.summary}</div>
        )}
      </div>
    </Link>
  )
}
