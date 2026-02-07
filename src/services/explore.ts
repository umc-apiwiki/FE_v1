import api from './api'
import type {
  ApiResponse,
  ApiListParams,
  PageResponse,
  ApiPreview,
  ApiDetail,
  FavoriteToggle,
} from '@/types/api'

/**
 * API 목록 조회 (필터 + 정렬 + 페이징)
 */
export const getApiList = async (
  params?: ApiListParams
): Promise<ApiResponse<PageResponse<ApiPreview>>> => {
  try {
    const response = await api.get('/api/v1/apis', { params })
    return response.data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<PageResponse<ApiPreview>> } }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    throw error
  }
}

/**
 * API 상세 조회
 */
export const getApiDetail = async (apiId: number): Promise<ApiResponse<ApiDetail>> => {
  try {
    const response = await api.get(`/api/v1/apis/${apiId}`)
    return response.data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<ApiDetail> } }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    throw error
  }
}

/**
 * 북마크 토글 (좋아요 / 좋아요 취소)
 */
export const toggleFavorite = async (apiId: number): Promise<ApiResponse<FavoriteToggle>> => {
  try {
    const response = await api.post(`/api/v1/apis/${apiId}/favorite`)
    return response.data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<FavoriteToggle> } }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    throw error
  }
}
