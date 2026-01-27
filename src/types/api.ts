/**
 * OpenAPI 기반 타입 정의
 */

// ===== Auth API Types =====

export interface SignupRequest {
  email: string
  password: string
  nickname: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  memberId: number
  accessToken: string
  nickname: string
}

export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T | null
}

// ===== API Card Types =====

export interface APICardData {
  id: number
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description?: string
}

// ===== Search Types =====

export interface SearchResult {
  id: number
  title: string
  category?: string
  star?: string
}
