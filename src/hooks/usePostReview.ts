import { useCallback } from 'react'
import { useApi } from './useApi'
import { postReview } from '@/services/review'
import type { PostReviewRequest, PostReviewResult } from '@/types/api'

/**
 * 리뷰 작성 훅
 */
export const usePostReview = () => {
  /* 리뷰 작성 성공 시 결과 데이터를 관리함 */
  const { data, isLoading, error, execute, reset, clearError } = useApi<PostReviewResult>()

  const createReview = useCallback(
    (apiId: number, body: PostReviewRequest, onSuccess?: () => void) => {
      return execute(
        () =>
          postReview(apiId, body).then((res) => {
            if (!res.isSuccess || !res.result) {
              throw new Error(res.message || '리뷰 작성에 실패했습니다.')
            }
            /* 작성 성공 시 결과 데이터 반환 */
            return res.result
          }),
        onSuccess
      )
    },
    [execute]
  )

  return { data, isLoading, error, createReview, reset, clearError }
}
