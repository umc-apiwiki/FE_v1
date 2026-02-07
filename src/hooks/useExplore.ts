import { useCallback } from 'react'
import { useApi } from './useApi'
import { getApiList, getApiDetail, toggleFavorite } from '@/services/explore'
import type { ApiListParams, PageResponse, ApiPreview, ApiDetail, FavoriteToggle } from '@/types/api'

/**
 * API 목록 조회 훅
 */
export const useApiList = () => {
  const { data, isLoading, error, execute, reset, clearError } =
    useApi<PageResponse<ApiPreview>>()

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
