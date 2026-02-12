import * as Sentry from '@sentry/react'
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
      // 401은 예상된 에러이므로 Sentry에 보고하지 않음
    } else if (error.response && error.response.status >= 500) {
      // 5xx 서버 에러는 Sentry에 보고
      Sentry.captureException(error, {
        tags: {
          service: 'axios',
          action: 'response_interceptor',
          status: error.response.status,
          critical: 'true',
        },
        extra: {
          url: error.config?.url,
          method: error.config?.method,
          statusText: error.response.statusText,
          data: error.response.data,
        },
      })
    } else if (!error.response) {
      // 네트워크 에러 (서버 응답 없음)
      Sentry.captureException(error, {
        tags: {
          service: 'axios',
          action: 'network_error',
          critical: 'true',
        },
        extra: {
          url: error.config?.url,
          method: error.config?.method,
          message: error.message,
        },
      })
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
