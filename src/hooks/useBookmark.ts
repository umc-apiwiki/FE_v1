import { useCallback, useEffect } from 'react'
import { useApi } from './useApi'
import { getMyActivities } from '@/services/bookmark'
import { toggleFavorite } from '@/services/explore'
import type { ActivityGroup } from '@/types/api'
import type { FavoriteToggle } from '@/types/api'

/**
 * 북마크 관련 로직을 처리하는 커스텀 훅 (서버 기준)
 */
export const useBookmark = () => {
  const {
    data: activityGroups,
    isLoading,
    error,
    execute: executeList,
    reset,
    clearError,
  } = useApi<ActivityGroup[]>()

  const {
    isLoading: isToggling,
    error: toggleError,
    execute: executeToggle,
  } = useApi<FavoriteToggle>()

  /**
   * 서버에서 날짜별 북마크 활동을 불러옵니다.
   */
  const fetchBookmarks = useCallback(() => {
    return executeList(async () => {
      const res = await getMyActivities()

      if (!res.isSuccess || !res.result) {
        throw new Error(res.message || '북마크 목록을 불러오는데 실패했습니다.')
      }

      return res.result
    })
  }, [executeList])

  /**
   * 북마크 토글
   */
  const toggleBookmark = useCallback(
    async (apiId: number) => {
      const result = await executeToggle(() =>
        toggleFavorite(apiId).then((res) => {
          if (!res.isSuccess || !res.result) {
            throw new Error(res.message || '북마크 처리에 실패했습니다.')
          }
          return res.result
        })
      )

      // 성공 시 서버 기준으로 다시 조회
      if (result.success && result.data) {
        await fetchBookmarks()
      }

      return result
    },
    [executeToggle, fetchBookmarks]
  )

  /**
   * 최초 마운트 시 조회
   */
  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  return {
    groupedByDate: activityGroups ?? [],
    isLoading,
    isToggling,
    error: error || toggleError,
    toggleBookmark,
    reset,
    clearError,
  }
}
