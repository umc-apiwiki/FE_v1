import { useState, type PropsWithChildren } from 'react'
import { AuthContext } from './AuthContext'
import type { RequestSigninDto } from '@/types/auth'
import { useTokenStorage } from '@/hooks/useTokenStorage'
import { postLogout, postSignin } from '@/apis/auth'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getToken, setToken, removeToken } = useTokenStorage()
  const [accessToken, setAccessToken] = useState<string | null>(getToken())
  /* 로딩 상태 관리 변수 추가 */
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * 로그인 요청 처리
   * 로딩 상태 제어 및 단계별 피드백 제공
   */
  const login = async (signInData: RequestSigninDto) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await postSignin(signInData)

      /* 응답 객체 존재 여부 확인 */
      if (!response) {
        alert('서버로부터 응답이 없음.')
        return
      }

      if (response.isSuccess && response.result) {
        setToken(response.result.accessToken)
        setAccessToken(response.result.accessToken)

        alert('로그인 성공')
        window.location.href = '/'
      } else {
        /* 실패 시 서버 메시지 알림 */
        const errorMessage = response.message || '로그인 정보가 일치하지 않음.'
        alert(errorMessage)
      }
    } catch (error: any) {
      /* API 통신 자체 실패 시 에러 메시지 추출 */
      const axiosErrorMessage = error?.response?.data?.message || '네트워크 오류가 발생했음.'
      alert(axiosErrorMessage)
      console.error(error)
    } finally {
      /* 통신 완료 후 로딩 상태 해제 */
      setIsLoading(false)
    }
  }

  /**
   * 로그아웃 처리
   */
  const logout = async () => {
    try {
      await postLogout()
    } catch (error) {
      console.error('로그아웃 통신 실패:', error)
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
