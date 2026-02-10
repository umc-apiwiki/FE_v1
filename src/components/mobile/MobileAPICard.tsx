/**
 * MobileAPICard 컴포넌트
 * 모바일 환경에서 API 카드를 표시
 * Next.js의 Link와 Image를 React Router의 Link로 변환
 */

import { Link } from 'react-router-dom'
import type { MobileAPI } from '../../types/api'

type MobileAPICardProps = {
  api: MobileAPI
}

export const MobileAPICard = ({ api }: MobileAPICardProps) => {
  // 사용자 수 포맷팅
  const formatUsers = (users?: string) => {
    if (!users) return 'N/A'
    const num = parseFloat(users.replace(/[^\d.]/g, ''))
    if (users.includes('B')) return `${num}B`
    if (users.includes('M')) return `${num}M`
    if (users.includes('K')) return `${num}K`
    return users
  }

  return (
    <Link to={`/api/${api.id}`} className="block w-full h-full bg-white rounded-xl shadow-sm border border-blue-500 transition-all hover:shadow-md hover:-translate-y-1">
      <div className="p-4">
        {/* Top Section: Image and Info */}
        <div className="flex gap-4 items-start">
          {/* Logo Image */}
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            {api.logo ? (
              api.logo.length > 4 ||
              api.logo.startsWith('http') ||
              api.logo.startsWith('/') ||
              api.logo.startsWith('data:') ? (
                <img
                  src={api.logo}
                  alt={api.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">{api.logo}</span>
              )
            ) : (
              <span className="text-3xl">📦</span>
            )}
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
              {api.rating && (
                <div className="flex items-center gap-1 text-yellow-600">
                  <span className="text-sm">★</span>
                  <span className="font-medium">{api.rating}</span>
                </div>
              )}

              {/* Used By */}
              {api.users && (
                <span className="text-gray-500">{formatUsers(api.users)}+ uses</span>
              )}

              {/* Paid/Free Badge */}
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  api.price === 'free'
                    ? 'bg-green-100 text-green-700'
                    : api.price === 'paid'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {api.price === 'free' ? 'FREE' : api.price === 'paid' ? 'PAID' : 'MIXED'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {api.description && (
          <div className="mt-3 text-sm text-gray-600 line-clamp-2">{api.description}</div>
        )}
      </div>
    </Link>
  )
}
