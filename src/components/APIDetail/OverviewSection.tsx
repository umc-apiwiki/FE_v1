import Category from './Category'
import type { CategoryItem } from '@/types/api'

type OverviewSectionProps = {
  longDescription: string
  categories: CategoryItem[]
}

export default function OverviewSection({ longDescription, categories }: OverviewSectionProps) {
  return (
    <div>
      {/* 설명 */}
      <div className="mb-10">
        <span className="text-[22px] font-medium text-info-darker ">설명</span>
        <p className="text-xl font-medium text-info-dark mt-2">
          {longDescription || '설명이 없습니다.'}
        </p>
      </div>
      {/* 카테고리 */}
      {categories.length > 0 && (
        <div className="z-10">
          <span className="text-[22px] font-medium text-info-darker">카테고리</span>
          <div className="flex gap-3 mt-3 mb-6">
            {categories.map((cat) => (
              <Category key={cat.categoryId} category={{ id: cat.categoryId, name: cat.name }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
