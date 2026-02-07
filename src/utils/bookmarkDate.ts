/**
 * 북마크 날짜 관리 유틸리티
 * 서버 API에 북마크 날짜 정보가 없으므로 로컬스토리지로 관리
 * 임시저장 나중에 삭제하고 서버에 반영할 예정
 */

const BOOKMARK_DATE_KEY = 'bookmark_dates'

type BookmarkDateMap = Record<number, string> // { apiId: date }

/**
 * 북마크 날짜 맵을 로컬스토리지에서 가져옵니다
 */
const getBookmarkDates = (): BookmarkDateMap => {
  try {
    const stored = localStorage.getItem(BOOKMARK_DATE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * 북마크 날짜 맵을 로컬스토리지에 저장합니다
 */
const saveBookmarkDates = (dates: BookmarkDateMap): void => {
  try {
    localStorage.setItem(BOOKMARK_DATE_KEY, JSON.stringify(dates))
  } catch (error) {
    console.error('북마크 날짜 저장 실패:', error)
  }
}

/**
 * 특정 API의 북마크 날짜를 저장합니다
 */
export const saveBookmarkDate = (apiId: number, date: string = new Date().toISOString()): void => {
  const dates = getBookmarkDates()
  dates[apiId] = date
  saveBookmarkDates(dates)
}

/**
 * 특정 API의 북마크 날짜를 가져옵니다
 */
export const getBookmarkDate = (apiId: number): string | null => {
  const dates = getBookmarkDates()
  return dates[apiId] || null
}

/**
 * 특정 API의 북마크 날짜를 삭제합니다
 */
export const removeBookmarkDate = (apiId: number): void => {
  const dates = getBookmarkDates()
  delete dates[apiId]
  saveBookmarkDates(dates)
}

/**
 * 날짜 문자열을 "YYYY.MM.DD" 형식으로 포맷합니다
 */
export const formatBookmarkDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  } catch {
    return dateStr
  }
}

/**
 * 모든 북마크 날짜를 초기화합니다
 */
export const clearAllBookmarkDates = (): void => {
  localStorage.removeItem(BOOKMARK_DATE_KEY)
}
