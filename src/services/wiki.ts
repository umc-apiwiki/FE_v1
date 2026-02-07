import { axiosInstance } from '@/apis/axios'
import type { ApiResponse, WikiContent, WikiUpdateRequest } from '@/types/api'

/**
 * 위키 내용 조회
 * GET /api/v1/apis/{apiId}/wiki
 */
export const getWikiContent = async (apiId: number): Promise<ApiResponse<WikiContent>> => {
  const { data } = await axiosInstance.get<ApiResponse<WikiContent>>(`/api/v1/apis/${apiId}/wiki`)
  return data
}

/**
 * 위키 수정
 * PATCH /api/v1/apis/{apiId}/wiki
 */
export const updateWiki = async (
  apiId: number,
  body: WikiUpdateRequest
): Promise<ApiResponse<string>> => {
  const { data } = await axiosInstance.patch<ApiResponse<string>>(
    `/api/v1/apis/${apiId}/wiki`,
    body
  )
  return data
}
