import { axiosInstance } from '@/apis/axios'
import type {
  ApiResponse,
  PostReviewRequest,
  PostReviewResult,
  DeleteReviewResult,
} from '@/types/api'

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
 * 특정 API의 리뷰 목록 조회
 * GET /api/v1/apis/{apiId}/reviews
 */
export const getApiReviews = async (
  apiId: number,
  params?: { page?: number; size?: number }
): Promise<ApiResponse<any>> => {
  const { data } = await axiosInstance.get<ApiResponse<any>>(`/api/v1/apis/${apiId}/reviews`, {
    params,
  })
  return data
}

/**
 * 특정 API에 작성된 본인의 리뷰 삭제
 * DELETE /api/v1/apis/{apiId}/reviews/{reviewId}
 */
export const deleteReview = async (
  apiId: number,
  reviewId: number
): Promise<ApiResponse<DeleteReviewResult>> => {
  const { data } = await axiosInstance.delete<ApiResponse<DeleteReviewResult>>(
    `/api/v1/apis/${apiId}/reviews/${reviewId}`
  )
  return data
}
