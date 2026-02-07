import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import type { RequestSigninDto } from '@/types/auth'
import { useTokenStorage } from '@/hooks/useTokenStorage'
import { postLogout, postSignin } from '@/apis/auth'

interface AuthContextType {
  accessToken: string | null
  login: (signInData: RequestSigninDto) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getToken, setToken, removeToken } = useTokenStorage()

  const [accessToken, setAccessToken] = useState<string | null>(getToken())

  const login = async (signInData: RequestSigninDto) => {
    try {
      const response = await postSignin(signInData)

      if (response && response.isSuccess && response.result) {
        const newAccessToken = response.result.accessToken

        setToken(newAccessToken)
        setAccessToken(newAccessToken)

        alert('로그인 성공')
        window.location.href = '/'
      } else {
        throw new Error(response?.message || '로그인 실패')
      }
    } catch (error) {
      console.error('로그인 오류 상세:', error)
      alert('로그인에 실패했습니다.')
    }
  }

  const logout = async () => {
    try {
      await postLogout()
    } catch (error) {
      console.error('로그아웃 API 오류 발생함 클라이언트 처리는 계속 진행함', error)
    } finally {
      try {
        removeToken()
        setAccessToken(null)

        alert('로그아웃 되었습니다.')
        window.location.href = '/'
      } catch (cleanupError) {
        console.error('클라이언트측 로그아웃 처리 중 오류 발생', cleanupError)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext를 찾을 수 없습니다 AuthProvider로 감싸주세요')
  }
  return context
}
