import { useCallback } from 'react'
import { useApi } from './useApi'
import { deleteReview } from '@/services/review'
import type { DeleteReviewResult } from '@/types/api'

/* 특정 리뷰를 삭제하는 기능을 담당하는 훅 */
export const useDeleteReview = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<DeleteReviewResult>()

  /* 삭제 실행 함수 */
  const removeReview = useCallback(
    (apiId: number, reviewId: number, onSuccess?: () => void) => {
      return execute(
        () =>
          deleteReview(apiId, reviewId).then((res) => {
            if (!res.isSuccess || !res.result) {
              throw new Error(res.message || '리뷰 삭제에 실패했습니다.')
            }
            return res.result
          }),
        onSuccess
      )
    },
    [execute]
  )

  return {
    data,
    isLoading,
    error,
    removeReview,
    reset,
    clearError,
  }
}
