import type { ActivityGroup, ApiResponse } from '@/types/api'
import api from './api'

// service
export const getMyActivities = async (): Promise<ApiResponse<ActivityGroup[]>> => {
  try {
    const response = await api.get('/api/v1/users/me/activities')
    return response.data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { data?: ApiResponse<ActivityGroup[]> }
      }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    throw error
  }
}
