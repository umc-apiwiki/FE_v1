import { useCallback, useEffect, useMemo } from 'react'
import { useApi } from './useApi'
import { getApiList, toggleFavorite } from '@/services/explore'
import type { PageResponse, ApiPreview, FavoriteToggle } from '@/types/api'
import {
  getBookmarkDate,
  saveBookmarkDate,
  removeBookmarkDate,
  formatBookmarkDate,
} from '@/utils/bookmarkDate'

/**
 * 날짜별로 그룹화된 북마크 데이터 타입
 */
export type BookmarkGroup = {
  date: string // YYYY.MM.DD 형식
  items: ApiPreview[]
}

/**
 * 북마크 관련 로직을 처리하는 커스텀 훅
 * - 북마크된 API 목록 조회
 * - 북마크 토글 (추가/해제)
 * - 날짜별 그룹화
 */
export const useBookmark = () => {
  const {
    data: bookmarkedApis,
    isLoading,
    error,
    execute: executeList,
    reset,
    clearError,
  } = useApi<PageResponse<ApiPreview>>()

  const {
    isLoading: isToggling,
    error: toggleError,
    execute: executeToggle,
  } = useApi<FavoriteToggle>()

  /**
   * 북마크된 API 목록을 불러옵니다.
   * 서버에서 모든 API를 가져온 후 isFavorited가 true인 항목만 필터링합니다.
   */
  const fetchBookmarkedApis = useCallback(() => {
    return executeList(async () => {
      // 충분히 큰 size로 API 목록을 가져옵니다
      const res = await getApiList({ size: 1000, page: 0 })

      if (!res.isSuccess || !res.result) {
        throw new Error(res.message || '북마크 목록을 불러오는데 실패했습니다.')
      }

      // isFavorited가 true인 항목만 필터링
      const filteredContent = res.result.content.filter((api) => api.isFavorited)

      return {
        ...res.result,
        content: filteredContent,
        listSize: filteredContent.length,
        totalElements: filteredContent.length,
      }
    })
  }, [executeList])

  /**
   * 북마크를 토글(추가/해제)합니다.
   * 성공 시 목록을 다시 불러오고, 날짜 정보를 저장/삭제합니다.
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

      // 성공 후 날짜 정보 저장/삭제 및 목록 새로고침
      if (result.success && result.data) {
        if (result.data.isFavorited) {
          // 북마크 추가 시 현재 날짜 저장
          saveBookmarkDate(apiId)
        } else {
          // 북마크 해제 시 날짜 삭제
          removeBookmarkDate(apiId)
        }
        await fetchBookmarkedApis()
      }

      return result
    },
    [executeToggle, fetchBookmarkedApis]
  )

  /**
   * 북마크 목록을 날짜별로 그룹화합니다.
   */
  const groupedByDate = useMemo(() => {
    const content = bookmarkedApis?.content || []
    if (content.length === 0) return []

    // 날짜별로 그룹화
    const groups: Record<string, ApiPreview[]> = {}

    content.forEach((api) => {
      const dateStr = getBookmarkDate(api.apiId)
      const formattedDate = dateStr
        ? formatBookmarkDate(dateStr)
        : formatBookmarkDate(new Date().toISOString())

      if (!groups[formattedDate]) {
        groups[formattedDate] = []
      }
      groups[formattedDate].push(api)
    })

    // 날짜별로 정렬 (최신순)
    const sorted = Object.entries(groups).sort(([dateA], [dateB]) => {
      return dateB.localeCompare(dateA)
    })

    return sorted.map(([date, items]) => ({
      date,
      items,
    }))
  }, [bookmarkedApis])

  /**
   * 컴포넌트 마운트 시 북마크 목록을 자동으로 불러옵니다.
   */
  useEffect(() => {
    fetchBookmarkedApis()
  }, [fetchBookmarkedApis])

  return {
    bookmarkedApis: bookmarkedApis?.content || [],
    groupedByDate,
    isLoading,
    isToggling,
    error: error || toggleError,
    fetchBookmarkedApis,
    toggleBookmark,
    reset,
    clearError,
  }
}
