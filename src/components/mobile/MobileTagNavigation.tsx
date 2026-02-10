/**
 * MobileTagNavigation 컴포넌트
 * 모바일 환경에서 태그 네비게이션 표시
 * framer-motion을 사용하여 애니메이션 효과 적용
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type Tag = {
  id: string
  name: string
  icon?: string
  color?: string
}

const tags: Tag[] = [
  { id: 'public', name: '공개', icon: '🌐', color: 'bg-blue-50 text-blue-600' },
  { id: 'opensource', name: '오픈소스', icon: '📦', color: 'bg-green-50 text-green-600' },
  { id: 'search', name: '검색', icon: '🔍', color: 'bg-purple-50 text-purple-600' },
  { id: 'translate', name: '번역', icon: '🌍', color: 'bg-pink-50 text-pink-600' },
  { id: 'ai', name: 'AI', icon: '🤖', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'finance', name: '금융', icon: '💰', color: 'bg-yellow-50 text-yellow-600' },
]

export const MobileTagNavigation = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide md:hidden">
      <div className="flex gap-2 px-4 py-2">
        {tags.map((tag, index) => (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/explore?tag=${tag.id}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all hover:scale-105 ${
                tag.color || 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag.icon && <span className="text-base">{tag.icon}</span>}
              <span className="text-xs font-medium">{tag.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
