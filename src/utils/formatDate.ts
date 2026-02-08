/**
 * 날짜 문자열을 "YYYY.MM.DD" 형식으로 포맷합니다
 */
export const formatDate = (dateStr: string): string => {
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
