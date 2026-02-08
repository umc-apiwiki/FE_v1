import api from './api'
import type { ApiResponse, ApiPricing } from '@/types/api'

/**
 * 요금 정보 조회
 * GET /api/v1/apis/{apiId}/pricing
 */
export const getApiPricing = async (apiId: number): Promise<ApiResponse<ApiPricing>> => {
  try {
    const response = await api.get(`/api/v1/apis/${apiId}/pricing`)
    return response.data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<ApiPricing> } }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    throw error
  }
}
