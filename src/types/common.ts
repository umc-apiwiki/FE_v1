// API 공통 응답 구조 정의
export type CommonResponse<T> = {
  isSuccess: boolean
  code: string
  message: string
  result: T
}
