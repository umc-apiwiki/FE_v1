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
  // 테스트 유저 정보 (타임스탬프 기반)
  const TEST_EMAIL = 'testuser@apiwiki.com'
  const TEST_PASSWORD = 'Test1234!'
  const TEST_NICKNAME = 'testuser'

  beforeEach(() => {
    localStorage.clear()
  })

  /**
   * 회원가입 테스트 (이미 존재하면 패스)
   */
  it('회원가입 - 이미 존재하면 패스', async () => {
    const result = await signup({
      email: TEST_EMAIL,
      password: 'Testuser123', // 영문+숫자 조합 8자 이상
      nickname: TEST_NICKNAME,
    })
    console.log('✅ 회원가입 응답:', result)
    expect(result.isSuccess).toBeDefined()
    expect(result.code).toBeDefined()
    expect(result.message).toBeDefined()
    if (result.isSuccess) {
      expect(result.result).toBeDefined()
      expect(result.result?.accessToken).toBeDefined()
      expect(result.result?.memberId).toBeDefined()
      expect(result.result?.nickname).toBeDefined()
      console.log('✅ 회원가입 성공!')
      console.log('   - memberId:', result.result?.memberId)
      console.log('   - nickname:', result.result?.nickname)
      console.log('   - token:', result.result?.accessToken?.substring(0, 20) + '...')
    } else if (
      result.code === 'USER4000' || // 이미 사용 중인 이메일
      result.code === 'USER4001' || // 이미 존재하는 회원
      result.message.includes('이미 존재') ||
      result.message.includes('이미 사용 중')
    ) {
      // 이미 존재하는 회원/이메일이면 패스 처리
      console.log('⚠️ 이미 존재하는 회원/이메일, 테스트 패스')
      expect(true).toBe(true)
    } else {
      // 그 외 실패는 에러
      throw new Error(result.message)
    }
  }, 10000)

  /**
   * 회원가입한 유저로 로그인 테스트
   */
  it('로그인 - 회원가입 유저로 성공', async () => {
    const result = await login({
      email: TEST_EMAIL,
      password: 'Testuser123', // 회원가입과 동일한 비밀번호 사용
    })
    console.log('✅ 로그인 응답:', {
      isSuccess: result.isSuccess,
      code: result.code,
      message: result.message,
    })
    expect(result.isSuccess).toBeDefined()
    expect(result.code).toBeDefined()
    expect(result.message).toBeDefined()
    if (result.isSuccess) {
      expect(result.result).toBeDefined()
      expect(result.result?.accessToken).toBeDefined()
      expect(result.result?.memberId).toBeDefined()
      expect(result.result?.nickname).toBeDefined()
      console.log('✅ 로그인 성공!')
    } else {
      throw new Error(result.message)
    }
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
