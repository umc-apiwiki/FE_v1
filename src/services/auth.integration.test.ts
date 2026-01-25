import { describe, it, expect, beforeEach } from 'vitest'
import { signup, login, logout } from '@/services'

/**
 * Auth API 실제 서버 연동 테스트
 * 
 * ⚠️ 주의사항:
 * 1. 테스트 전용 계정이 필요합니다
 * 2. 회원가입은 중복 방지를 위해 주석 처리되어 있습니다
 * 3. 개발 서버에 테스트 계정을 미리 생성해주세요
 * 
 * 실행 방법:
 * npm test auth.integration.test.ts
 */
describe('Auth API - 실제 서버 연동', () => {
  const TEST_EMAIL = 'test@apiwiki.com'
  const TEST_PASSWORD = 'Test1234!'
  const TEST_NICKNAME = 'TestUser'

  beforeEach(() => {
    localStorage.clear()
  })

  /**
   * 회원가입 테스트
   * ⚠️ 실제 서버에 데이터를 생성하므로 주의!
   * 테스트 전용 DB가 없다면 주석 처리하세요
   * 현제 회원가입 테스트는 건너뜁니다
   */
  it.skip('회원가입 - 실제 서버 응답 확인', async () => {
    try {
      const result = await signup({
        email: `test_${Date.now()}@apiwiki.com`, // 중복 방지
        password: TEST_PASSWORD,
        nickname: `TestUser_${Date.now()}`,
      })

      console.log('✅ 회원가입 응답:', result)

      expect(result.isSuccess).toBeDefined()
      
      if (result.isSuccess) {
        expect(result.result).toBeDefined()
        expect(result.result?.accessToken).toBeDefined()
        expect(result.result?.memberId).toBeDefined()
        expect(result.result?.nickname).toBeDefined()
        
        console.log('✅ 회원가입 성공!')
        console.log('   - memberId:', result.result?.memberId)
        console.log('   - nickname:', result.result?.nickname)
        console.log('   - token:', result.result?.accessToken?.substring(0, 20) + '...')
      } else {
        console.log('❌ 회원가입 실패:', result.message)
      }

      // 성공/실패와 무관하게 응답 구조는 검증
      expect(result.code).toBeDefined()
      expect(result.message).toBeDefined()
    } catch (error) {
      console.error('❌ 회원가입 에러:', error)
      throw error
    }
  }, 10000)

  /**
   * 로그인 테스트 - 존재하지 않는 계정
   * ✅ 서버가 정상적으로 에러를 반환하는지 확인
   */
  it('로그인 실패 - 존재하지 않는 계정', async () => {
    const result = await login({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })

    console.log('✅ 로그인 응답:', {
      isSuccess: result.isSuccess,
      code: result.code,
      message: result.message,
    })

    // 응답 구조 검증
    expect(result.isSuccess).toBeDefined()
    expect(result.code).toBeDefined()
    expect(result.message).toBeDefined()

    // 실패 응답이어야 함
    expect(result.isSuccess).toBe(false)
    expect(result.code).toBe('USER4002')
    expect(result.message).toContain('존재하지 않습니다')

    console.log('✅ 서버가 정상적으로 에러를 반환함')
    console.log('   - 에러 코드:', result.code)
    console.log('   - 에러 메시지:', result.message)
  }, 10000)

  /**
   * 로그인 실패 케이스 (잘못된 비밀번호)
   */
  it('로그인 실패 - 잘못된 비밀번호', async () => {
    const result = await login({
      email: TEST_EMAIL,
      password: 'WrongPassword123!',
    })

    console.log('✅ 로그인 실패 응답:', {
      isSuccess: result.isSuccess,
      message: result.message,
    })

    // 실패 응답이어야 함
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBeDefined()
    
    console.log('✅ 로그인 실패 케이스 정상 처리됨')
  }, 10000)

  /**
   * 로그아웃 테스트
   */
  it('로그아웃 - 실제 서버 응답 확인', async () => {
    // 먼저 로그인
    localStorage.setItem('accessToken', 'test-token')
    localStorage.setItem('memberId', '1')
    localStorage.setItem('nickname', 'TestUser')

    const result = await logout()

    console.log('✅ 로그아웃 응답:', {
      isSuccess: result.isSuccess,
      message: result.message,
    })

    expect(result.isSuccess).toBeDefined()
    expect(result.message).toBeDefined()

    if (result.isSuccess) {
      console.log('✅ 로그아웃 성공!')
      
      // localStorage가 정리되었는지 확인
      expect(localStorage.getItem('accessToken')).toBeNull()
      expect(localStorage.getItem('memberId')).toBeNull()
      expect(localStorage.getItem('nickname')).toBeNull()
    }
  }, 10000)

  /**
   * 응답 시간 측정
   */
  it('로그인 - 응답 시간 측정', async () => {
    const startTime = Date.now()

    await login({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })

    const endTime = Date.now()
    const responseTime = endTime - startTime

    console.log(`⏱️ 로그인 응답 시간: ${responseTime}ms`)

    // 응답 시간이 5초 이내여야 함
    expect(responseTime).toBeLessThan(5000)
  }, 10000)
})
