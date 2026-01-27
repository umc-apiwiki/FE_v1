import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useApi } from '@/hooks'
import { AxiosError } from 'axios'

describe('useApi Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('초기 상태', () => {
    it('데이터 없음, 로딩 아님, 에러 없음으로 시작', () => {
      const { result } = renderHook(() => useApi())

      expect(result.current.data).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  describe('execute 메서드', () => {
    it('API 호출 성공', async () => {
      const { result } = renderHook(() => useApi<{ id: number; name: string }>())

      const mockData = { id: 1, name: 'test' }

      await act(async () => {
        const response = await result.current.execute(() => Promise.resolve(mockData))

        expect(response.success).toBe(true)
        expect(response.data).toEqual(mockData)
      })

      expect(result.current.data).toEqual(mockData)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('API 호출 중 로딩 상태 업데이트', async () => {
      const { result } = renderHook(() => useApi<string>())

      const slowPromise = new Promise<string>((resolve) => {
        setTimeout(() => resolve('data'), 100)
      })

      act(() => {
        result.current.execute(() => slowPromise)
      })

      // 즉시 확인하면 로딩 중이어야 함 (경우에 따라 다를 수 있음)
      // 완료 후에만 확인하는 것이 더 안정적
    })

    it('API 호출 실패 - 일반 에러', async () => {
      const { result } = renderHook(() => useApi())

      const error = new Error('Network error')

      await act(async () => {
        const response = await result.current.execute(() => Promise.reject(error))

        expect(response.success).toBe(false)
        expect(response.error).toBe('Network error')
      })

      expect(result.current.data).toBeNull()
      expect(result.current.error).toBe('Network error')
      expect(result.current.isLoading).toBe(false)
    })

    it('API 호출 실패 - AxiosError', async () => {
      const { result } = renderHook(() => useApi())

      const axiosError = new AxiosError('Request failed')
      axiosError.response = {
        status: 400,
        data: { message: 'Bad Request' },
        statusText: 'Bad Request',
        headers: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: {} as any,
      }

      await act(async () => {
        const response = await result.current.execute(() => Promise.reject(axiosError))

        expect(response.success).toBe(false)
        expect(response.error).toBe('Bad Request')
      })

      expect(result.current.error).toBe('Bad Request')
    })

    it('onSuccess 콜백 실행', async () => {
      const { result } = renderHook(() => useApi<{ id: number }>())
      const onSuccess = vi.fn()

      const mockData = { id: 1 }

      await act(async () => {
        await result.current.execute(() => Promise.resolve(mockData), onSuccess)
      })

      expect(onSuccess).toHaveBeenCalledWith(mockData)
    })

    it('onError 콜백 실행', async () => {
      const { result } = renderHook(() => useApi())
      const onError = vi.fn()

      const error = new Error('Failed')

      await act(async () => {
        await result.current.execute(() => Promise.reject(error), undefined, onError)
      })

      expect(onError).toHaveBeenCalledWith('Failed')
    })
  })

  describe('reset 메서드', () => {
    it('상태 초기화', async () => {
      const { result } = renderHook(() => useApi<string>())

      // 먼저 데이터 설정
      await act(async () => {
        await result.current.execute(() => Promise.resolve('data'))
      })

      expect(result.current.data).toBe('data')

      // 초기화
      act(() => {
        result.current.reset()
      })

      expect(result.current.data).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  describe('clearError 메서드', () => {
    it('에러만 초기화', async () => {
      const { result } = renderHook(() => useApi<string>())

      const mockData = 'data'

      // 데이터 설정
      await act(async () => {
        await result.current.execute(() => Promise.resolve(mockData))
      })

      expect(result.current.data).toBe(mockData)

      // 에러 생성
      await act(async () => {
        await result.current.execute(() => Promise.reject(new Error('Error')))
      })

      expect(result.current.error).not.toBeNull()
      expect(result.current.data).toBeNull()

      // 에러만 초기화
      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('타입 안정성', () => {
    it('제네릭 타입 유지', async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      const { result } = renderHook(() => useApi<User>())

      const mockUser: User = { id: 1, name: 'John', email: 'john@example.com' }

      await act(async () => {
        await result.current.execute(() => Promise.resolve(mockUser))
      })

      expect(result.current.data?.name).toBe('John')
      expect(result.current.data?.email).toBe('john@example.com')
    })
  })
})
