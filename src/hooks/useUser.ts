import { useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useApi } from './useApi'
import { getMyProfile, getMyWikiHistory } from '@/services/user'
import type { MyProfile, WikiHistoryParams } from '@/types/api'

// 1. 내 프로필 조회 훅
export const useMyProfile = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<MyProfile>()

  const fetchProfile = useCallback(() => {
    return execute(async () => {
      const res = await getMyProfile()
      if (!res.isSuccess || !res.result) {
        throw new Error(res.message || '프로필 정보를 불러오는데 실패했습니다.')
      }
      return res.result
    })
  }, [execute])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return { profile: data, isLoading, error, fetchProfile, reset, clearError }
}

// 2. 위키 히스토리 조회 훅
export const useWikiHistory = (params: WikiHistoryParams) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['wikiHistory', params],
    queryFn: () => getMyWikiHistory(params),
    staleTime: 1000 * 60 * 5,
  })

  // API 응답 구조에 맞춰 리스트 추출
  const wikiHistoryList = data?.result?.content || []

  return {
    wikiHistoryList,
    pagination: {
      totalPage: data?.result?.totalPage || 0,
      currentPage: data?.result?.currentPage || 0,
      totalElements: data?.result?.totalElements || 0,
      last: data?.result?.last ?? true,
    },
    isLoading,
    isError,
    refetch,
  }
}
