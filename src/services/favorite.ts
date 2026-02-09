import api from './api'
import type { ApiResponse, FavoriteToggle } from '@/types/api'

/**
 * API 즐겨찾기(좋아요) 토글
 * POST /api/v1/apis/{apiId}/favorite
 */
export const toggleFavorite = async (apiId: number): Promise<ApiResponse<FavoriteToggle>> => {
  const response = await api.post(`/api/v1/apis/${apiId}/favorite`)
  return response.data
}
