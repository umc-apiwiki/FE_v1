import { useState, useCallback } from 'react'
import { AxiosError } from 'axios' // [추가] 에러 타입 임포트
import { deleteReview } from '@/services/review'
import { useAuth } from '@/hooks/useAuth'

interface DeleteReviewResult {
  isSuccess: boolean
  message: string
}

// 백엔드 에러 응답 타입 정의
interface ErrorResponse {
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
        const response = await deleteReview(apiId, reviewId)

        if (response.isSuccess) {
          return { isSuccess: true, message: '리뷰가 삭제되었습니다.' }
        } else {
          const msg = response.message || '리뷰 삭제에 실패했습니다.'
          setError(msg)
          return { isSuccess: false, message: msg }
        }
      } catch (err) {
        // [수정] any 제거하고 AxiosError로 타입 단언
        const apiError = err as AxiosError<ErrorResponse>
        console.error('Delete review error:', apiError)

        let msg = '오류가 발생했습니다.'

        if (apiError.response) {
          // 서버 응답이 있는 경우
          msg = apiError.response.data?.message || `서버 오류 (${apiError.response.status})`
        } else if (apiError.request) {
          // 요청은 갔으나 응답이 없는 경우
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
