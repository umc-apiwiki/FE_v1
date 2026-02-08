import type { ApiPricing } from '@/types/api'

interface PricingSectionProps {
  categories?: { categoryId: number; name: string }[]
  pricing?: ApiPricing | null
}

const PricingSection = ({ pricing }: PricingSectionProps) => {
  if (!pricing || !pricing.pricingInfoCsv) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400">
        등록된 요금 정보가 없습니다.
      </div>
    )
  }

  // CSV 데이터를 행 단위로 분리
  const rows = pricing.pricingInfoCsv.split('\n').filter((row) => row.trim() !== '')
  const headers = rows[0].split(',')
  const bodyRows = rows.slice(1)

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 요금 상세 정보 */}
      <div className="text-xl font-medium text-sky-900">요금 상세 정보</div>

      {/* 히스토리 페이지 스타일을 적용한 요금 카드 */}
      <div className="flex h-fit w-[1112px] flex-col items-center rounded-[20px] border border-sky-500 bg-white/80 py-8 shadow-sm">
        {/* Table Header */}
        <div className="mb-6 grid w-[1000px] grid-cols-4 text-center">
          {headers.map((header, index) => (
            <div key={index} className="text-lg font-medium text-sky-900 uppercase tracking-wider">
              {header.trim()}
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div className="mb-6 h-0 w-[1000px] border-t border-sky-900/50" />

        {/* Table Body */}
        <div className="flex w-[1000px] flex-col gap-5">
          {bodyRows.map((row, rowIndex) => {
            // 따옴표가 포함된 CSV 필드 처리를 위해 정규식 분리 (단순 split 시 콤마 포함 필드 오류 방지)
            const columns = row.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []

            return (
              <div key={rowIndex} className="grid grid-cols-4 items-center text-center">
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className="text-lg font-medium text-sky-900">
                    {col.replace(/"/g, '').trim()}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PricingSection
