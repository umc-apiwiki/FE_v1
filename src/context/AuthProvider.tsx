import { useState, type PropsWithChildren } from 'react'
import { AuthContext } from './AuthContext'
import type { RequestSigninDto } from '@/types/auth'
import { useTokenStorage } from '@/hooks/useTokenStorage'
import { postLogout, postSignin } from '@/apis/auth'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getToken, setToken, removeToken } = useTokenStorage()
  const [accessToken, setAccessToken] = useState<string | null>(getToken())

  /**
   * 로그인 처리
   * 성공 시 토큰 저장 및 알림 표시, 실패 시 에러를 던짐
   */
  const login = async (signInData: RequestSigninDto) => {
    try {
      const response = await postSignin(signInData)

      if (response?.isSuccess && response.result) {
        setToken(response.result.accessToken)
        setAccessToken(response.result.accessToken)

        alert('로그인 성공')
        window.location.href = '/'
      } else {
        const errorMessage = response?.message || '로그인에 실패했음.'
        alert(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        alert('로그인 중 알 수 없는 오류가 발생했음.')
      }
      throw error
    }
  }

  /**
   * 로그아웃 처리
   * 서버 응답 여부와 상관없이 클라이언트 토큰 삭제 및 알림 표시
   */
  const logout = async () => {
    try {
      await postLogout()
    } catch (error) {
      console.error('서버 로그아웃 처리 실패:', error)
    } finally {
      removeToken()
      setAccessToken(null)

      alert('로그아웃 되었음')
      window.location.href = '/'
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>
  )
}
