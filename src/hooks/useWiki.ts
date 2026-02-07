import { useCallback } from 'react'
import { useApi } from './useApi'
import { getWikiContent, updateWiki } from '@/services/wiki'
import type { WikiContent, WikiUpdateRequest } from '@/types/api'

/**
 * 위키 내용 조회 훅
 */
export const useWikiContent = () => {
  const { data, isLoading, error, execute, reset, clearError } = useApi<WikiContent>()

  const fetchWiki = useCallback(
    (apiId: number) => {
      return execute(() =>
        getWikiContent(apiId).then((res) => {
          if (!res.isSuccess || !res.result) {
            throw new Error(res.message || '위키 내용을 불러오는데 실패했습니다.')
          }
          return res.result
        })
      )
    },
    [execute]
  )

  return { data, isLoading, error, fetchWiki, reset, clearError }
}

/**
 * 위키 수정 훅
 */
export const useWikiUpdate = () => {
  // 수정 성공 시 서버에서 string 메시지를 반환함
  const { data, isLoading, error, execute, reset, clearError } = useApi<string>()

  const saveWiki = useCallback(
    (apiId: number, body: WikiUpdateRequest, onSuccess?: () => void) => {
      return execute(
        () =>
          updateWiki(apiId, body).then((res) => {
            if (!res.isSuccess) {
              throw new Error(res.message || '위키 수정에 실패했습니다.')
            }
            // 수정 성공 시 메시지 반환 (API 명세상 result가 string)
            return res.result || '수정되었습니다.'
          }),
        onSuccess
      )
    },
    [execute]
  )

  return { data, isLoading, error, saveWiki, reset, clearError }
}
