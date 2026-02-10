import { createContext, useContext } from 'react'
import type { ApiPreview } from '@/types/api'

type CompareContextType = {
  /** 비교 대상 API 목록 */
  compareList: ApiPreview[]
  /** 비교 목록에 추가 */
  addToCompare: (api: ApiPreview) => void
  /** 비교 목록에서 제거 */
  removeFromCompare: (apiId: number) => void
  /** 비교 목록 전체 초기화 */
  clearCompare: () => void
  /** 특정 API가 비교 목록에 있는지 확인 */
  isInCompare: (apiId: number) => boolean
}

export const CompareContext = createContext<CompareContextType | null>(null)

export const useCompareContext = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompareContext must be used within CompareProvider')
  }
  return context
}
