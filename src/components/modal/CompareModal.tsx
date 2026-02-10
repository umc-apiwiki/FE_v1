import type { ApiPreview, ApiPricing } from '@/types/api'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

type CompareModalProps = {
  /** 모달 열림/닫힘 상태 */
  isOpen: boolean
  /** 모달 닫기 함수 */
  onClose: () => void
  /** 비교할 API 목록 */
  compareList: ApiPreview[]
  /** 각 API의 가격 정보 맵 */
  pricingData: Map<number, ApiPricing>
  /** 가격 정보 로딩 중 여부 */
  isLoading: boolean
  /** 비교 목록에서 제거 */
  onRemove: (apiId: number) => void
  /** 비교 목록 전체 초기화 */
  onClear?: () => void
}

const PRICING_LABEL: Record<string, string> = {
  FREE: '무료',
  PAID: '유료',
  MIXED: '무료 & 유료',
}

const LOGO_BASE = 'https://api-wiki-api-logos.s3.ap-northeast-2.amazonaws.com/api-logos'

/** 닫기 아이콘 SVG 컴포넌트 */
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * CSV 텍스트를 마크다운 테이블로 변환
 */
const csvToMarkdown = (csv: string): string => {
  if (!csv) return '가격 정보가 없습니다.'

  const lines = csv.trim().split('\n')
  if (lines.length === 0) return '가격 정보가 없습니다.'

  // 첫 번째 줄을 헤더로 사용
  const header = lines[0]
  const rows = lines.slice(1)

  // 마크다운 테이블 생성
  let markdown = header + '\n'
  markdown +=
    header
      .split(',')
      .map(() => '---')
      .join(' | ') + '\n'
  rows.forEach((row) => {
    markdown += row + '\n'
  })

  return markdown
}

/**
 * 마크다운 테이블을 HTML로 렌더링
 */
const MarkdownTable = ({ markdown }: { markdown: string }) => {
  const lines = markdown.trim().split('\n')
  if (lines.length < 3) {
    return <div className="text-gray-500 text-sm">{markdown}</div>
  }

  const headers = lines[0].split(',').map((h) => h.trim())
  const rows = lines.slice(2).map((line) => line.split(',').map((cell) => cell.trim()))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-2 text-left font-semibold text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-gray-100 hover:bg-gray-50">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-2 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CompareModal({
  isOpen,
  onClose,
  compareList,
  pricingData,
  isLoading,
  onRemove,
  onClear,
}: CompareModalProps) {
  const navigate = useNavigate()

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative z-50 w-[90vw] max-w-6xl max-h-[85vh] bg-white rounded-2xl p-8 overflow-hidden flex flex-col shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">API 가격 비교</h2>
            {compareList.length > 0 && onClear && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('비교 목록을 모두 삭제하시겠습니까?')) {
                    onClear()
                    onClose()
                  }
                }}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                전체 삭제
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 비교 내용 */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">가격 정보를 불러오는 중...</div>
            </div>
          ) : compareList.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">비교할 API가 없습니다.</div>
            </div>
          ) : (
            <div className="space-y-8">
              {compareList.map((api) => {
                const pricing = pricingData.get(api.apiId)
                const logoUrl = api.logo ?? `${LOGO_BASE}/api_${api.apiId}.png`

                return (
                  <div key={api.apiId} className="border border-gray-200 rounded-xl p-6">
                    {/* API 정보 헤더 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={logoUrl}
                          alt={api.name}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = `${LOGO_BASE}/api_default.png`
                          }}
                        />
                        <div>
                          <h3
                            className="text-xl font-bold text-gray-900 cursor-pointer hover:text-brand-500"
                            onClick={() => navigate(`/apis/${api.apiId}`)}
                          >
                            {api.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{api.summary}</p>
                          {pricing && (
                            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-brand-100 text-brand-700">
                              {PRICING_LABEL[pricing.pricingType] || pricing.pricingType}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(api.apiId)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    {/* 가격 정보 테이블 */}
                    <div className="mt-4">
                      {pricing?.pricingInfoCsv ? (
                        <MarkdownTable markdown={csvToMarkdown(pricing.pricingInfoCsv)} />
                      ) : (
                        <div className="text-gray-500 text-sm text-center py-8">
                          가격 정보가 없습니다.
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
