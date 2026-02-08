import { axiosInstance } from '@/apis/axios'
import type { ApiResponse, MyProfile } from '@/types/api'

/**
 * 로그인한 사용자의 프로필 정보 조회
 * GET /api/v1/users/me
 */
export const getMyProfile = async (): Promise<ApiResponse<MyProfile>> => {
  const { data } = await axiosInstance.get<ApiResponse<MyProfile>>('/api/v1/users/me')
  return data
}