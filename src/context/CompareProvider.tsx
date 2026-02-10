import { useState, useMemo, useCallback, type ReactNode } from 'react'
import { CompareContext } from './CompareContext'
import type { ApiPreview } from '@/types/api'

type CompareProviderProps = {
  children: ReactNode
  /** 최대 비교 가능 개수 (기본값: 3) */
  maxCompare?: number
}

export const CompareProvider = ({ children, maxCompare = 3 }: CompareProviderProps) => {
  const [compareList, setCompareList] = useState<ApiPreview[]>([])

  const addToCompare = useCallback(
    (api: ApiPreview) => {
      setCompareList((prev) => {
        // 이미 존재하면 추가하지 않음
        if (prev.some((item) => item.apiId === api.apiId)) {
          return prev
        }
        // 최대 개수 초과 시 추가하지 않음
        if (prev.length >= maxCompare) {
          alert(`최대 ${maxCompare}개까지 비교할 수 있습니다.`)
          return prev
        }
        return [...prev, api]
      })
    },
    [maxCompare]
  )

  const removeFromCompare = useCallback((apiId: number) => {
    setCompareList((prev) => prev.filter((item) => item.apiId !== apiId))
  }, [])

  const clearCompare = useCallback(() => {
    setCompareList([])
  }, [])

  const isInCompare = useCallback(
    (apiId: number) => {
      return compareList.some((item) => item.apiId === apiId)
    },
    [compareList]
  )

  const value = useMemo(
    () => ({
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
    }),
    [compareList, addToCompare, removeFromCompare, clearCompare, isInCompare]
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}
