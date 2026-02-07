import { LOCAL_STORAGE_KEY } from '@/constants/key'

export const useTokenStorage = () => {
  const getToken = () => window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)

  const setToken = (token: string) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token)
  }

  const removeToken = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
  }

  return { getToken, setToken, removeToken }
}
