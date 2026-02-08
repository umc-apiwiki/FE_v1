import { axiosInstance } from '@/apis/axios'
import type { ApiResponse, MyProfile, WikiHistoryParams, MyWikiHistory } from '@/types/api'

/**
 * 로그인한 사용자의 프로필 정보 조회
 * GET /api/v1/users/me
 */
export const getMyProfile = async (): Promise<ApiResponse<MyProfile>> => {
  const { data } = await axiosInstance.get<ApiResponse<MyProfile>>('/api/v1/users/me')
  return data
}

/**
 * 사용자의 위키 편집 목록 조회
 * POST /api/v1/users/me/wikis
 */
export const getMyWikiHistory = async (params?: WikiHistoryParams): Promise<MyWikiHistory> => {
  /* GET에서 POST로 변경, params를 body로 전달함 */
  const { data } = await axiosInstance.post<MyWikiHistory>('/api/v1/users/me/wikis', params)
  return data
}
