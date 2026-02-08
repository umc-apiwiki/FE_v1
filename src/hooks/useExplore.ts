import { useCallback } from 'react'
import { useApi } from './useApi'
import { getApiList, getApiDetail, toggleFavorite } from '@/services/explore'
import api from '@/services/api'
import type {
  ApiListParams,
  PageResponse,
  ApiPreview,
  ApiDetail,
  FavoriteToggle,
  ApiPricing,
  ApiResponseApiPricing,
} from '@/types/api'

/**
 * API 목록 조회 훅
 */
export const useApiList = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<PageResponse<ApiPreview>>()

  const fetchApiList = useCallback(
    (params?: ApiListParams) => {
      return execute(() =>
        getApiList(params).then((res) => {
          if (!res.isSuccess || !res.result) throw new Error(res.message)
          return res.result
        })
      )
    },
    [execute]
  )

  return { data, isLoading, error, fetchApiList, reset, clearError }
}

/**
 * API 상세 조회 훅
 */
export const useApiDetail = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<ApiDetail>()

  const fetchApiDetail = useCallback(
    (apiId: number) => {
      return execute(() =>
        getApiDetail(apiId).then((res) => {
          if (!res.isSuccess || !res.result) throw new Error(res.message)
          return res.result
        })
      )
    },
    [execute]
  )

  return { data, isLoading, error, fetchApiDetail, reset, clearError }
}

/**
 *  API 비용 정보 조회 훅 (Swagger 명세 반영)
 * 상세 페이지의 Pricing 정보를 가져옵니다.
 */
export const useApiPricing = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<ApiPricing>()

  const fetchApiPricing = useCallback(
    (apiId: number) => {
      return execute(async () => {
        // services/explore.ts를 수정하지 않고 여기서 직접 호출합니다.
        const response = await api.get<ApiResponseApiPricing>(`/api/v1/apis/${apiId}/pricing`)
        const res = response.data

        if (!res.isSuccess || !res.result) throw new Error(res.message)
        return res.result
      })
    },
    [execute]
  )

  return { data, isLoading, error, fetchApiPricing, reset, clearError }
}

/**
 * 북마크 토글 훅
 */
export const useFavoriteToggle = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<FavoriteToggle>()

  const toggle = useCallback(
    (apiId: number, onSuccess?: (data: FavoriteToggle) => void) => {
      return execute(
        () =>
          toggleFavorite(apiId).then((res) => {
            if (!res.isSuccess || !res.result) throw new Error(res.message)
            return res.result
          }),
        onSuccess
      )
    },
    [execute]
  )

  return { data, isLoading, error, toggle, reset, clearError }
}
