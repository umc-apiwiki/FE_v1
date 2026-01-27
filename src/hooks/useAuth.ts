import { useState, useCallback } from 'react'
import { signup, login, logout, getCurrentUser } from '@/services'
import type { SignupRequest, LoginRequest } from '@/types/api'

interface AuthState {
  memberId: number | null
  nickname: string | null
  isAuthenticated: boolean
}

interface AuthError {
  message: string
  code?: string
}

/**
 * 인증 상태 및 로그인/회원가입/로그아웃 로직 관리
 */
export const useAuth = () => {
  const [state, setState] = useState<AuthState>(() => {
    const user = getCurrentUser()
    return {
      memberId: user.memberId,
      nickname: user.nickname,
      isAuthenticated: user.isAuthenticated,
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  /**
   * 회원가입
   */
  const signUpAsync = useCallback(async (data: SignupRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signup(data)
      if (result.isSuccess && result.result) {
        setState({
          memberId: result.result.memberId,
          nickname: result.result.nickname,
          isAuthenticated: true,
        })
        return { success: true, data: result.result }
      } else {
        const err: AuthError = {
          message: result.message || '회원가입에 실패했습니다.',
          code: result.code,
        }
        setError(err)
        return { success: false, error: err }
      }
    } catch (err) {
      const error: AuthError = {
        message: err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.',
      }
      setError(error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * 로그인
   */
  const loginAsync = useCallback(async (data: LoginRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await login(data)
      if (result.isSuccess && result.result) {
        setState({
          memberId: result.result.memberId,
          nickname: result.result.nickname,
          isAuthenticated: true,
        })
        return { success: true, data: result.result }
      } else {
        const err: AuthError = {
          message: result.message || '로그인에 실패했습니다.',
          code: result.code,
        }
        setError(err)
        return { success: false, error: err }
      }
    } catch (err) {
      const error: AuthError = {
        message: err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.',
      }
      setError(error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * 로그아웃
   */
  const logoutAsync = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await logout()
      if (result.isSuccess) {
        setState({
          memberId: null,
          nickname: null,
          isAuthenticated: false,
        })
        return { success: true }
      } else {
        const err: AuthError = {
          message: result.message || '로그아웃에 실패했습니다.',
          code: result.code,
        }
        setError(err)
        return { success: false, error: err }
      }
    } catch (err) {
      const error: AuthError = {
        message: err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.',
      }
      setError(error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * 에러 초기화
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    memberId: state.memberId,
    nickname: state.nickname,
    isAuthenticated: state.isAuthenticated,
    isLoading,
    error,

    // Actions
    signUp: signUpAsync,
    login: loginAsync,
    logout: logoutAsync,
    clearError,
  }
}
