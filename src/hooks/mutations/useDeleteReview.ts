import { useState, useCallback } from 'react'
import { deleteReview } from '@/services/review'
import { useAuth } from '@/hooks/useAuth'

interface DeleteReviewResult {
  isSuccess: boolean
  message: string
}

export const useDeleteReview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken } = useAuth()

  const mutate = useCallback(
    async (apiId: number, reviewId: number): Promise<DeleteReviewResult> => {
      setIsLoading(true)
      setError(null)

      if (!accessToken) {
        return { isSuccess: false, message: '로그인이 필요합니다.' }
      }

      try {
        // axiosInstance를 사용하는 서비스 함수 호출
        const response = await deleteReview(apiId, reviewId)

        if (response.isSuccess) {
          return { isSuccess: true, message: '리뷰가 삭제되었습니다.' }
        } else {
          // 서버에서 200 OK를 줬지만 논리적 실패인 경우
          const msg = response.message || '리뷰 삭제에 실패했습니다.'
          setError(msg)
          return { isSuccess: false, message: msg }
        }
      } catch (err: any) {
        console.error('Delete review error:', err)

        let msg = '오류가 발생했습니다.'
        // axios 에러 객체 처리
        if (err.response) {
          // 서버가 4xx, 5xx 응답을 준 경우
          msg = err.response.data?.message || `서버 오류 (${err.response.status})`
        } else if (err.request) {
          // 요청은 갔는데 응답이 없는 경우
          msg = '서버로부터 응답이 없습니다.'
        }

        setError(msg)
        return { isSuccess: false, message: msg }
      } finally {
        setIsLoading(false)
      }
    },
    [accessToken]
  )

  return {
    mutate,
    isLoading,
    error,
  }
}
