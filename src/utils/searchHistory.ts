/**
 * 검색 내역 관리 유틸리티
 * 쿠키를 사용하여 최근 검색어를 저장하고 관리합니다.
 */

const COOKIE_NAME = 'search_history'
const MAX_HISTORY = 10
const DAYS_TO_EXPIRE = 30

/**
 * 쿠키에서 검색 내역 배열 조회
 */
export const getSearchHistory = (): string[] => {
  try {
    const cookies = document.cookie.split('; ')
    const historyCookie = cookies.find((row) => row.startsWith(`${COOKIE_NAME}=`))

    if (!historyCookie) return []

    const value = historyCookie.split('=')[1]
    const decoded = decodeURIComponent(value)
    const parsed = JSON.parse(decoded)

    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('검색 내역 조회 실패:', error)
    return []
  }
}

/**
 * 검색 내역에 새 검색어 추가
 * - 중복 제거 (기존 검색어를 맨 앞으로 이동)
 * - 최대 MAX_HISTORY개까지 유지
 */
export const addSearchHistory = (query: string): void => {
  if (!query.trim()) return

  try {
    const history = getSearchHistory()
    const trimmedQuery = query.trim()

    // 중복 제거
    const filtered = history.filter((item) => item !== trimmedQuery)

    // 맨 앞에 추가
    const updated = [trimmedQuery, ...filtered].slice(0, MAX_HISTORY)

    // 쿠키 저장
    const encoded = encodeURIComponent(JSON.stringify(updated))
    const expires = new Date()
    expires.setDate(expires.getDate() + DAYS_TO_EXPIRE)

    document.cookie = `${COOKIE_NAME}=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  } catch (error) {
    console.error('검색 내역 저장 실패:', error)
  }
}

/**
 * 특정 검색어를 내역에서 삭제
 */
export const removeSearchHistory = (query: string): void => {
  try {
    const history = getSearchHistory()
    const updated = history.filter((item) => item !== query)

    if (updated.length === 0) {
      // 모두 삭제된 경우 쿠키 삭제
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      return
    }

    const encoded = encodeURIComponent(JSON.stringify(updated))
    const expires = new Date()
    expires.setDate(expires.getDate() + DAYS_TO_EXPIRE)

    document.cookie = `${COOKIE_NAME}=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
  } catch (error) {
    console.error('검색 내역 삭제 실패:', error)
  }
}

/**
 * 전체 검색 내역 삭제
 */
export const clearSearchHistory = (): void => {
  try {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  } catch (error) {
    console.error('검색 내역 전체 삭제 실패:', error)
  }
}
