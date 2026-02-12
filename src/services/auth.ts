import * as Sentry from '@sentry/react'
import api from './api'
import type { ApiResponse, LoginRequest, LoginResponse, SignupRequest } from '@/types/api'

/**
 * 회원가입
 */
export const signup = async (data: SignupRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await api.post('/api/v1/auth/signup', data)
    return response.data
  } catch (error: unknown) {
    // 서버가 400 에러로 응답한 경우에도 response.data 반환
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<LoginResponse>; status?: number } }
      if (axiosError.response?.data) {
        // 5xx 서버 에러는 Sentry에 보고
        if (axiosError.response.status && axiosError.response.status >= 500) {
          Sentry.captureException(error, {
            tags: { service: 'auth', action: 'signup' },
            extra: { email: data.email },
          })
        }
        return axiosError.response.data
      }
    }
    // 예상치 못한 에러는 Sentry에 보고
    Sentry.captureException(error, {
      tags: { service: 'auth', action: 'signup' },
      extra: { email: data.email },
    })
    throw error
  }
}

/**
 * 로그인
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await api.post('/api/v1/auth/login', data)
    const result = response.data

    // 로그인 성공 시 토큰과 유저 정보 저장
    if (result.isSuccess && result.result) {
      localStorage.setItem('accessToken', result.result.accessToken)
      localStorage.setItem('memberId', String(result.result.memberId))
      localStorage.setItem('nickname', result.result.nickname)
    }

    return result
  } catch (error: unknown) {
    // 서버가 400 에러로 응답한 경우에도 response.data 반환
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<LoginResponse>; status?: number } }
      if (axiosError.response?.data) {
        // 5xx 서버 에러는 Sentry에 보고
        if (axiosError.response.status && axiosError.response.status >= 500) {
          Sentry.captureException(error, {
            tags: { service: 'auth', action: 'login' },
            extra: { email: data.email },
          })
        }
        return axiosError.response.data
      }
    }
    // 예상치 못한 에러는 Sentry에 보고 (특히 로그인 실패는 중요)
    Sentry.captureException(error, {
      tags: { service: 'auth', action: 'login', critical: 'true' },
      extra: { email: data.email },
    })
    throw error
  }
}

/**
 * 로그아웃
 */
export const logout = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post('/api/v1/auth/logout')
    const result = response.data

    // 로그아웃 성공 시 로컬 스토리지 정리
    if (result.isSuccess) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('memberId')
      localStorage.removeItem('nickname')
    }

    return result
  } catch (error: unknown) {
    // 서버가 400 에러로 응답한 경우에도 response.data 반환
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: ApiResponse<string>; status?: number } }
      if (axiosError.response?.data) {
        // 5xx 서버 에러는 Sentry에 보고
        if (axiosError.response.status && axiosError.response.status >= 500) {
          Sentry.captureException(error, {
            tags: { service: 'auth', action: 'logout' },
          })
        }
        return axiosError.response.data
      }
    }
    // 로그아웃 실패는 비중요하지만 기록
    Sentry.captureException(error, {
      tags: { service: 'auth', action: 'logout' },
      level: 'warning',
    })
    throw error
  }
}

/**
 * 저장된 토큰 반환
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

/**
 * 사용자 정보 반환
 */
export const getCurrentUser = () => {
  const memberId = localStorage.getItem('memberId')
  const nickname = localStorage.getItem('nickname')
  const accessToken = getAccessToken()

  return {
    memberId: memberId ? Number(memberId) : null,
    nickname,
    isAuthenticated: !!accessToken,
  }
}
