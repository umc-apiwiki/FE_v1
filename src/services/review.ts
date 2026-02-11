import { axiosInstance } from '@/apis/axios'
import type { ApiResponse, PostReviewRequest, PostReviewResult, ReviewList } from '@/types/api'

/**
 * 특정 API에 대한 리뷰 조회
 * GET /api/v1/apis/{apiId}/reviews
 */
export const getReviews = async (
  apiId: number,
  page: number = 0
): Promise<ApiResponse<ReviewList>> => {
  const { data } = await axiosInstance.get<ApiResponse<ReviewList>>(
    `/api/v1/apis/${apiId}/reviews`,
    {
      params: { page },
    }
  )
  return data
}

/**
 * 특정 API에 대한 리뷰 작성
 * POST /api/v1/apis/{apiId}/reviews
 */
export const postReview = async (
  apiId: number,
  body: PostReviewRequest
): Promise<ApiResponse<PostReviewResult>> => {
  const { data } = await axiosInstance.post<ApiResponse<PostReviewResult>>(
    `/api/v1/apis/${apiId}/reviews`,
    body
  )
  return data
}

/**
 * [추가] 특정 API 리뷰 삭제
 * DELETE /api/v1/apis/{apiId}/reviews/{reviewId}
 */
export const deleteReview = async (
  apiId: number,
  reviewId: number
): Promise<ApiResponse<string>> => {
  // axiosInstance를 쓰면 BaseURL과 토큰이 자동 적용됩니다.
  const { data } = await axiosInstance.delete<ApiResponse<string>>(
    `/api/v1/apis/${apiId}/reviews/${reviewId}`
  )
  return data
}
