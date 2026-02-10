import type { ApiPricing } from '@/types/api'

interface PricingSectionProps {
  categories?: { categoryId: number; name: string }[]
  pricing?: ApiPricing | null
}

const PricingSection = ({ pricing }: PricingSectionProps) => {
  if (!pricing || !pricing.pricingInfoCsv) {
    return (
      <div className="flex h-32 xs:h-36 md:h-40 items-center justify-center text-gray-400 text-sm xs:text-base">
        등록된 요금 정보가 없습니다.
      </div>
    )
  }

  // CSV 데이터를 행 단위로 분리
  const rows = pricing.pricingInfoCsv.split('\n').filter((row) => row.trim() !== '')
  const headers = rows[0].split(',')
  const bodyRows = rows.slice(1)

  return (
    <div className="flex w-full flex-col gap-3 xs:gap-4">
      {/* 요금 상세 정보 */}
      <div className="text-base xs:text-lg md:text-xl font-medium text-sky-900">요금 상세 정보</div>

      {/* 히스토리 페이지 스타일을 적용한 요금 카드 - 모바일에서 가로 스크롤 가능 */}
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-[600px] h-fit w-full max-w-[1112px] flex-col items-center rounded-[15px] xs:rounded-[20px] border border-sky-500 bg-white/80 py-4 xs:py-6 md:py-8 shadow-sm">
          {/* Table Header */}
          <div className="mb-4 xs:mb-5 md:mb-6 grid w-[calc(100%-2rem)] xs:w-[calc(100%-3rem)] md:w-[90%] grid-cols-4 text-center">
            {headers.map((header, index) => (
              <div
                key={index}
                className="text-xs xs:text-sm md:text-base lg:text-lg font-medium text-sky-900 uppercase tracking-wider"
              >
                {header.trim()}
              </div>
            ))}
          </div>

          {/* 구분선 */}
          <div className="mb-4 xs:mb-5 md:mb-6 h-0 w-[calc(100%-2rem)] xs:w-[calc(100%-3rem)] md:w-[90%] border-t border-sky-900/50" />

          {/* Table Body */}
          <div className="flex w-[calc(100%-2rem)] xs:w-[calc(100%-3rem)] md:w-[90%] flex-col gap-3 xs:gap-4 md:gap-5">
            {bodyRows.map((row, rowIndex) => {
              // 따옴표가 포함된 CSV 필드 처리를 위해 정규식 분리 (단순 split 시 콤마 포함 필드 오류 방지)
              const columns = row.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []

              return (
                <div key={rowIndex} className="grid grid-cols-4 items-center text-center">
                  {columns.map((col, colIndex) => (
                    <div
                      key={colIndex}
                      className="text-xs xs:text-sm md:text-base lg:text-lg font-medium text-sky-900"
                    >
                      {col.replace(/"/g, '').trim()}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
