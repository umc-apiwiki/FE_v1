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
      
      console.log('🔐 [Axios] JWT 토큰 헤더 추가', {
        url: config.url,
        method: config.method?.toUpperCase(),
        hasToken: true,
        tokenPreview: accessToken.substring(0, 20) + '...',
      })
    } else {
      console.warn('⚠️ [Axios] JWT 토큰이 없습니다', {
        url: config.url,
        method: config.method?.toUpperCase(),
      })
    }

    return config
  },
  (error) => {
    console.error('❌ [Axios] 요청 인터셉터 에러', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ [Axios] 응답 성공', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
    })
    return response
  },
  (error) => {
    console.group('❌ [Axios] 응답 에러')
    console.error('에러 객체:', error)
    console.log('URL:', error.config?.url)
    console.log('Method:', error.config?.method?.toUpperCase())
    console.log('Status:', error.response?.status)
    console.log('Status Text:', error.response?.statusText)
    console.log('응답 데이터:', error.response?.data)
    console.groupEnd()
    
    // 401 에러(인증 만료 등) 발생 시 처리
    if (error.response && error.response.status === 401) {
      console.warn('🔓 [Axios] 401 인증 에러 - 토큰 제거')
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
