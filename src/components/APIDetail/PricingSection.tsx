import Category from './Category'

export default function PricingSection() {
  const categories = [
    { id: 1, name: '결제' },
    { id: 2, name: '소셜로그인' },
    { id: 3, name: '지도' },
    { id: 4, name: '날씨' },
  ]
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
      <div className="z-10">
        <span className="text-[22px] font-medium text-info-darker">카테고리</span>

        <div className="flex gap-3 mt-3 mb-6">
          {categories.map((cat) => (
            <Category key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  )
}
