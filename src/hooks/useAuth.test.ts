import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks'
import * as authService from '@/services'

// authService 모킹
vi.mock('@/services', () => ({
  signup: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
}))

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      memberId: null,
      nickname: null,
      isAuthenticated: false,
    })
  })

  describe('초기 상태', () => {
    it('인증되지 않은 상태로 시작', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.memberId).toBeNull()
      expect(result.current.nickname).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('저장된 사용자 정보가 있으면 로드', () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue({
        memberId: 1,
        nickname: 'testuser',
        isAuthenticated: true,
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.memberId).toBe(1)
      expect(result.current.nickname).toBe('testuser')
    })
  })

  describe('회원가입', () => {
    it('회원가입 성공', async () => {
      const mockLoginResponse = {
        memberId: 1,
        accessToken: 'mock-token',
        nickname: 'newuser',
      }

      vi.mocked(authService.signup).mockResolvedValue({
        isSuccess: true,
        code: '200',
        message: '회원가입 성공',
        result: mockLoginResponse,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.signUp({
          email: 'test@example.com',
          password: 'password123',
          nickname: 'newuser',
        })

        expect(response.success).toBe(true)
        expect(response.data).toEqual(mockLoginResponse)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.memberId).toBe(1)
      expect(result.current.nickname).toBe('newuser')
      expect(result.current.error).toBeNull()
    })

    it('회원가입 실패 시 에러 상태 업데이트', async () => {
      vi.mocked(authService.signup).mockResolvedValue({
        isSuccess: false,
        code: '400',
        message: '이미 존재하는 이메일입니다.',
        result: null,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.signUp({
          email: 'existing@example.com',
          password: 'password123',
          nickname: 'user',
        })

        expect(response.success).toBe(false)
        expect(response.error?.message).toBe('이미 존재하는 이메일입니다.')
      })

      expect(result.current.error).not.toBeNull()
      expect(result.current.error?.message).toBe('이미 존재하는 이메일입니다.')
    })

    it('네트워크 에러 처리', async () => {
      const networkError = new Error('Network request failed')
      vi.mocked(authService.signup).mockRejectedValue(networkError)

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.signUp({
          email: 'test@example.com',
          password: 'password123',
          nickname: 'user',
        })

        expect(response.success).toBe(false)
        expect(response.error?.message).toBe('Network request failed')
      })

      expect(result.current.error?.message).toBe('Network request failed')
    })
  })

  describe('로그인', () => {
    it('로그인 성공', async () => {
      const mockLoginResponse = {
        memberId: 1,
        accessToken: 'mock-token',
        nickname: 'testuser',
      }

      vi.mocked(authService.login).mockResolvedValue({
        isSuccess: true,
        code: '200',
        message: '로그인 성공',
        result: mockLoginResponse,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })

        expect(response.success).toBe(true)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.memberId).toBe(1)
    })

    it('로그인 실패', async () => {
      vi.mocked(authService.login).mockResolvedValue({
        isSuccess: false,
        code: '401',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        result: null,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.login({
          email: 'test@example.com',
          password: 'wrong',
        })

        expect(response.success).toBe(false)
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error?.message).toContain('올바르지 않습니다')
    })
  })

  describe('로그아웃', () => {
    it('로그아웃 성공', async () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue({
        memberId: 1,
        nickname: 'testuser',
        isAuthenticated: true,
      })

      vi.mocked(authService.logout).mockResolvedValue({
        isSuccess: true,
        code: '200',
        message: '로그아웃 성공',
        result: '로그아웃 되었습니다.',
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        const response = await result.current.logout()
        expect(response.success).toBe(true)
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.memberId).toBeNull()
      expect(result.current.nickname).toBeNull()
    })
  })

  describe('에러 처리', () => {
    it('clearError로 에러 초기화', async () => {
      vi.mocked(authService.login).mockResolvedValue({
        isSuccess: false,
        code: '401',
        message: '로그인 실패',
        result: null,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'wrong',
        })
      })

      expect(result.current.error).not.toBeNull()

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })
})
