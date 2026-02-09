import { useQuery } from '@tanstack/react-query'
import { getMyWikiHistory } from '@/services/user'
import type { WikiHistoryParams } from '@/types/api'

/**
 * 사용자의 위키 편집 내역 목록을 관리하는 커스텀 훅
 */
export const useWikiHistory = (params: WikiHistoryParams) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['wikiHistory', params],
    queryFn: () => getMyWikiHistory(params),
    staleTime: 1000 * 60 * 5,
  })

  /* API 명세에 존재하는 데이터만 필터링하여 반환 */
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
