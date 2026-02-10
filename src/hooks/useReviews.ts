import { useState, useEffect, useCallback } from 'react'
import { getReviews } from '@/services/review'
import type { ReviewList } from '@/types/api'

/**
 * 리뷰 목록 조회 훅
 */
export const useReviews = (apiId: number, initialPage: number = 0) => {
  const [data, setData] = useState<ReviewList | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const fetchReviews = useCallback(
    async (page: number) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getReviews(apiId, page)
        if (!response.isSuccess || !response.result) {
          throw new Error(response.message || '리뷰를 불러오는데 실패했습니다.')
        }
        setData(response.result)
        setCurrentPage(page)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    },
    [apiId]
  )

  /* 초기 로딩 */
  useEffect(() => {
    if (apiId && apiId > 0) {
      fetchReviews(initialPage)
    }
  }, [apiId, initialPage, fetchReviews])

  /* 페이지 변경 함수 */
  const goToPage = useCallback(
    (page: number) => {
      fetchReviews(page)
    },
    [fetchReviews]
  )

  /* 리뷰 새로고침 (작성/삭제 후 호출) */
  const refresh = useCallback(() => {
    fetchReviews(currentPage)
  }, [fetchReviews, currentPage])

  return {
    data,
    isLoading,
    error,
    currentPage,
    goToPage,
    refresh,
  }
}
