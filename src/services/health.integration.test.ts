import { describe, it, expect } from 'vitest'
import { healthCheck } from '@/services'

/**
 * 실제 서버 API 연동 테스트
 * Mock을 사용하지 않고 실제 서버로 요청을 보냅니다.
 *
 * 실행 방법:
 * npm test health.integration.test.ts
 */
describe('Health API - 실제 서버 연동', () => {
  it('헬스체크 API 호출 - 서버 응답 확인', async () => {
    try {
      const result = await healthCheck()

      // 응답 확인
      console.log('✅ 서버 응답:', result)
      expect(result).toBeDefined()

      // 일반적으로 'OK' 또는 'healthy' 같은 문자열 응답
      expect(typeof result).toBe('string')
    } catch (error) {
      console.error('❌ 서버 연결 실패:', error)

      // 에러 정보 출력
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message)
      }

      // 테스트 실패
      throw error
    }
  }, 10000) // 타임아웃 10초

  it('헬스체크 - 응답 시간 측정', async () => {
    const startTime = Date.now()

    await healthCheck()

    const endTime = Date.now()
    const responseTime = endTime - startTime

    console.log(`⏱️ 응답 시간: ${responseTime}ms`)

    // 응답 시간이 5초 이내여야 함
    expect(responseTime).toBeLessThan(5000)
  }, 10000)
})
