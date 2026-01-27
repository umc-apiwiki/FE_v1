import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as healthService from '@/services/health'
import api from '@/services/api'

// api 모듈 모킹
vi.mock('@/services/api')

describe('Health Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('healthCheck', () => {
    it('서버 헬스체크 성공', async () => {
      const mockResponse = {
        data: 'OK',
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await healthService.healthCheck()

      expect(result).toBe('OK')
      expect(api.get).toHaveBeenCalledWith('/health')
    })

    it('서버 헬스체크 실패 시 에러 던지기', async () => {
      const mockError = new Error('Network error')
      vi.mocked(api.get).mockRejectedValue(mockError)

      await expect(healthService.healthCheck()).rejects.toThrow('Network error')
    })
  })
})
