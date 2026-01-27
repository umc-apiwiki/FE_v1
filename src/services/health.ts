import api from './api'

/**
 * 서버 헬스체크
 */
export const healthCheck = async (): Promise<string> => {
  const response = await api.get('/health')
  return response.data
}
