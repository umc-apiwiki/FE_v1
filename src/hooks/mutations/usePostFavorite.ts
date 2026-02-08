// mutations/usePostFavorite.ts
import { useState, useCallback } from 'react'
import { toggleFavorite } from '@/services/favorite'
import type { FavoriteToggle } from '@/types/api'

export const usePostFavorite = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(async (apiId: number): Promise<FavoriteToggle> => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await toggleFavorite(apiId)

      if (!res.isSuccess || !res.result) {
        throw new Error(res.message || '좋아요 처리 실패')
      }
      return res.result
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    mutate,
    isLoading,
    error,
  }
}
