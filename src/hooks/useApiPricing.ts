import { useState, useEffect } from 'react'
import { getApiPricing } from '@/services/pricing'
import type { ApiPricing } from '@/types/api'

export const useApiPricing = (apiId: number) => {
  const [pricing, setPricing] = useState<ApiPricing | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // API ID가 유효하지 않으면 요청을 중단함
    if (!apiId) return

    const fetchPricing = async () => {
      try {
        setIsLoading(true)
        const response = await getApiPricing(apiId)

        // 응답 데이터가 성공적이면 상태를 업데이트함
        if (response.result) {
          setPricing(response.result)
        }
      } catch (err) {
        // 에러 발생 시 에러 객체를 저장함
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPricing()
  }, [apiId])

  return { pricing, isLoading, error }
}
