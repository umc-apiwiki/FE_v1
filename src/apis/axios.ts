import axios, { type AxiosInstance } from 'axios'
import { LOCAL_STORAGE_KEY } from '@/constants/key'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)

    if (accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러(인증 만료 등) 발생 시 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
