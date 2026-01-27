import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'

interface ApiState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

/**
 * 공용 API 호출 로직
 * 로딩, 에러, 데이터 상태 자동 관리
 */
export const useApi = <T = unknown>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  /**
   * API 요청 실행
   * @param apiCall - API 호출 함수
   * @param onSuccess - 성공 콜백
   * @param onError - 에러 콜백
   */
  const execute = useCallback(
    async (
      apiCall: () => Promise<T>,
      onSuccess?: (data: T) => void,
      onError?: (error: string) => void
    ) => {
      setState({ data: null, isLoading: true, error: null })

      try {
        const result = await apiCall()
        setState({ data: result, isLoading: false, error: null })
        onSuccess?.(result)
        return { success: true, data: result }
      } catch (err) {
        let errorMessage = '알 수 없는 오류가 발생했습니다.'

        if (err instanceof AxiosError) {
          errorMessage =
            err.response?.data?.message || err.message || '네트워크 오류가 발생했습니다.'
        } else if (err instanceof Error) {
          errorMessage = err.message
        }

        setState({ data: null, isLoading: false, error: errorMessage })
        onError?.(errorMessage)
        return { success: false, error: errorMessage }
      }
    },
    []
  )

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null })
  }, [])

  /**
   * 에러 초기화
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    clearError,
  }
}
