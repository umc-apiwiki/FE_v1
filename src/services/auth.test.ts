import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as authService from '@/services/auth'
import api from '@/services/api'

// api 모듈 모킹
vi.mock('@/services/api')

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('signup', () => {
    it('회원가입 성공 시 응답 반환', async () => {
      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '회원가입 성공',
          result: {
            memberId: 1,
            accessToken: 'mock-token',
            nickname: 'testuser',
          },
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await authService.signup({
        email: 'test@example.com',
        password: 'password123',
        nickname: 'testuser',
      })

      expect(result.isSuccess).toBe(true)
      expect(result.result?.memberId).toBe(1)
      expect(result.result?.accessToken).toBe('mock-token')
    })

    it('회원가입 실패 시 에러 메시지 반환', async () => {
      const mockResponse = {
        data: {
          isSuccess: false,
          code: '400',
          message: '이미 존재하는 이메일입니다.',
          result: null,
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await authService.signup({
        email: 'existing@example.com',
        password: 'password123',
        nickname: 'testuser',
      })

      expect(result.isSuccess).toBe(false)
      expect(result.message).toBe('이미 존재하는 이메일입니다.')
    })
  })

  describe('login', () => {
    it('로그인 성공 시 토큰을 localStorage에 저장', async () => {
      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '로그인 성공',
          result: {
            memberId: 1,
            accessToken: 'mock-token',
            nickname: 'testuser',
          },
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.isSuccess).toBe(true)
      expect(localStorage.getItem('accessToken')).toBe('mock-token')
      expect(localStorage.getItem('memberId')).toBe('1')
      expect(localStorage.getItem('nickname')).toBe('testuser')
    })

    it('로그인 실패 시 토큰 저장 안 함', async () => {
      const mockResponse = {
        data: {
          isSuccess: false,
          code: '401',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          result: null,
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      await authService.login({
        email: 'test@example.com',
        password: 'wrong-password',
      })

      expect(localStorage.getItem('accessToken')).toBeNull()
    })
  })

  describe('logout', () => {
    it('로그아웃 성공 시 localStorage 정리', async () => {
      // 먼저 토큰 저장
      localStorage.setItem('accessToken', 'mock-token')
      localStorage.setItem('memberId', '1')
      localStorage.setItem('nickname', 'testuser')

      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '로그아웃 성공',
          result: '로그아웃 되었습니다.',
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      await authService.logout()

      expect(localStorage.getItem('accessToken')).toBeNull()
      expect(localStorage.getItem('memberId')).toBeNull()
      expect(localStorage.getItem('nickname')).toBeNull()
    })
  })

  describe('getCurrentUser', () => {
    it('저장된 사용자 정보 반환', () => {
      localStorage.setItem('memberId', '1')
      localStorage.setItem('nickname', 'testuser')
      localStorage.setItem('accessToken', 'mock-token')

      const user = authService.getCurrentUser()

      expect(user.memberId).toBe(1)
      expect(user.nickname).toBe('testuser')
      expect(user.isAuthenticated).toBe(true)
    })

    it('저장된 정보가 없을 때 null 반환', () => {
      const user = authService.getCurrentUser()

      expect(user.memberId).toBeNull()
      expect(user.nickname).toBeNull()
      expect(user.isAuthenticated).toBe(false)
    })
  })

  describe('getAccessToken', () => {
    it('저장된 토큰 반환', () => {
      localStorage.setItem('accessToken', 'mock-token')
      const token = authService.getAccessToken()
      expect(token).toBe('mock-token')
    })

    it('저장된 토큰이 없을 때 null 반환', () => {
      const token = authService.getAccessToken()
      expect(token).toBeNull()
    })
  })
})
