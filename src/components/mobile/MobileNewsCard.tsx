/**
 * MobileNewsCard 컴포넌트
 * 모바일 환경에서 뉴스 카드를 표시
 */

import { Link } from 'react-router-dom'
import type { MobileNewsItem } from '../../types/api'

type MobileNewsCardProps = {
  news: MobileNewsItem
}

export const MobileNewsCard = ({ news }: MobileNewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '오늘'
    if (diffDays === 1) return '어제'
    if (diffDays < 7) return `${diffDays}일 전`
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  }

  return (
    <Link
      to={`/news/${news.id}`}
      className="block w-full h-full bg-white rounded-xl shadow-sm border border-blue-500 transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="p-4">
        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">{news.title}</h3>

        {/* 메타 정보 */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{news.author || '익명'}</span>
          <span>•</span>
          <span>{formatDate(news.date)}</span>
        </div>
      </div>
    </Link>
  )
}
