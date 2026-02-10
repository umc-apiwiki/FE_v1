import { useCallback, useState } from 'react'
import { useCompareContext } from '@/context/CompareContext'
import type { ApiPreview, ApiPricing } from '@/types/api'
import { getApiPricing } from '@/services/pricing'

/**
 * API 비교 기능을 위한 Hook
 * - 비교 목록 관리
 * - 비교 모달 열기/닫기
 * - 여러 API의 가격 정보 한번에 가져오기
 */
export const useCompare = () => {
  const { compareList, addToCompare, removeFromCompare, clearCompare, isInCompare } =
    useCompareContext()

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)
  const [pricingData, setPricingData] = useState<Map<number, ApiPricing>>(new Map())
  const [isLoadingPricing, setIsLoadingPricing] = useState(false)

  /**
   * 비교 목록에 API 추가
   */
  const handleAddToCompare = useCallback(
    (api: ApiPreview) => {
      addToCompare(api)
    },
    [addToCompare]
  )

  /**
   * 비교 목록에서 API 제거
   */
  const handleRemoveFromCompare = useCallback(
    (apiId: number) => {
      removeFromCompare(apiId)
      // 가격 정보도 함께 제거
      setPricingData((prev) => {
        const next = new Map(prev)
        next.delete(apiId)
        return next
      })
    },
    [removeFromCompare]
  )

  /**
   * 비교 모달 열기 + 가격 정보 가져오기
   */
  const openCompareModal = useCallback(async () => {
    if (compareList.length === 0) {
      alert('비교할 API를 선택해주세요.')
      return
    }

    setIsCompareModalOpen(true)
    setIsLoadingPricing(true)

    try {
      // 모든 API의 가격 정보를 병렬로 가져옴
      const promises = compareList.map((api) => getApiPricing(api.apiId))
      const results = await Promise.allSettled(promises)

      const newPricingData = new Map<number, ApiPricing>()

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.result) {
          const apiId = compareList[index].apiId
          newPricingData.set(apiId, result.value.result)
        }
      })

      setPricingData(newPricingData)
    } catch (error) {
      console.error('가격 정보를 가져오는 중 에러 발생:', error)
    } finally {
      setIsLoadingPricing(false)
    }
  }, [compareList])

  /**
   * 비교 모달 닫기
   */
  const closeCompareModal = useCallback(() => {
    setIsCompareModalOpen(false)
  }, [])

  /**
   * 비교 목록 전체 초기화
   */
  const handleClearCompare = useCallback(() => {
    clearCompare()
    setPricingData(new Map())
  }, [clearCompare])

  return {
    // 상태
    compareList,
    isCompareModalOpen,
    pricingData,
    isLoadingPricing,
    // 액션
    addToCompare: handleAddToCompare,
    removeFromCompare: handleRemoveFromCompare,
    clearCompare: handleClearCompare,
    isInCompare,
    openCompareModal,
    closeCompareModal,
  }
}
