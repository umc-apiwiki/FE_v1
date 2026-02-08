import Category from './Category'
import type { CategoryItem } from '@/types/api'

type PricingSectionProps = {
  categories: CategoryItem[]
}

export default function PricingSection({ categories }: PricingSectionProps) {
  return (
    <div>
      {/* 요금제 */}
      <div className="mb-20">
        <span className="text-[22px] font-medium text-info-darker ">요금제</span>
        <p className="text-xl font-medium text-info-dark mt-2">
          입력:
          <br />
          US$1.750/100만 개 토큰
          <br />
          캐시된 입력:
          <br />
          US$0.175/100만 개 토큰
          <br />
          출력:
          <br />
          US$14.000/100만 개 토큰
          <br />
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
