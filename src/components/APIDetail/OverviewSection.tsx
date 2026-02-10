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
      <div className="mb-6 xs:mb-8 md:mb-10">
        <span className="text-base xs:text-lg md:text-xl lg:text-[22px] font-medium text-info-darker">
          설명
        </span>
        <p className="text-sm xs:text-base md:text-lg lg:text-xl font-medium text-info-dark mt-2">
          {longDescription || '설명이 없습니다.'}
        </p>
      </div>
      {/* 카테고리 */}
      {categories.length > 0 && (
        <div className="z-10">
          <span className="text-base xs:text-lg md:text-xl lg:text-[22px] font-medium text-info-darker">
            카테고리
          </span>
          <div className="flex gap-2 xs:gap-3 mt-2 xs:mt-3 mb-4 xs:mb-5 md:mb-6 flex-wrap">
            {categories.map((cat) => (
              <Category key={cat.categoryId} category={{ id: cat.categoryId, name: cat.name }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
