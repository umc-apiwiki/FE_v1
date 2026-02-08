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

// ===== Explore API Types =====

export type SortOption = 'LATEST' | 'POPULAR' | 'MOST_REVIEWED'
export type SortDirection = 'ASC' | 'DESC'

export type PricingType = 'FREE' | 'PAID' | 'MIXED'
export type AuthType =
  | 'OAUTH2'
  | 'REFRESH_TOKEN'
  | 'ACCESS_TOKEN'
  | 'API_KEY'
  | 'JWT'
  | 'COOKIE'
  | 'BASIC'

export type ProviderCompany =
  | 'KAKAO'
  | 'NAVER'
  | 'GOOGLE'
  | 'MICROSOFT'
  | 'AMAZON'
  | 'META'
  | 'IBM'
  | 'APPLE'
  | 'SPOTIFY'
  | 'ATLASSIAN'
  | 'OPEN_WEATHER'
  | 'TELEGRAM'
  | 'MIXPANEL'
  | 'STRIPE'
  | 'LINKEDIN'
  | 'DISCORD'
  | 'ASANA'
  | 'WOLFRAM'
  | 'NOTION'
  | 'HUBSPOT'
  | 'PEXELS'
  | 'SLACK'
  | 'OPEN_STREET_MAP'
  | 'PAYPAL'
  | 'REDDIT'
  | 'DROPBOX'
  | 'DEEPL'
  | 'TWILIO'
  | 'NEWS_API'
  | 'OPEN_AI'
  | 'MAILCHIMP'
  | 'SHOPIFY'
  | 'SQUARE'
  | 'AMPLITUDE'
  | 'ZOOM'
  | 'AUTOMATTIC'
  | 'UNSPLASH'
  | 'SENDGRID'
  | 'GIPHY'
  | 'GITHUB'
  | 'TWITTER'
  | 'SALESFORCE'
  | 'OPEN_DATA'
  | 'ETC'

/** API 목록 조회 파라미터 */
export type ApiListParams = {
  page?: number
  size?: number
  categoryId?: number
  q?: string
  sort?: SortOption
  direction?: SortDirection
  providers?: ProviderCompany
  authTypes?: AuthType
  pricingTypes?: PricingType
  minRating?: number
}

/** 페이지네이션 공용 응답 */
export type PageResponse<T> = {
  content: T[]
  totalPage: number
  totalElements: number
  listSize: number
  currentPage: number
  first: boolean
  last: boolean
}

/** API 목록 카드 */
export type ApiPreview = {
  apiId: number
  name: string
  summary: string
  avgRating: number
  reviewCount: number
  viewCounts: number
  pricingType: PricingType
  authType: AuthType | null
  providerCompany: ProviderCompany
  isFavorited: boolean
  logo?: string
}

/** 카테고리 항목 */
export type CategoryItem = {
  categoryId: number
  name: string
}

/** API 상세 조회 */
export type ApiDetail = {
  apiId: number
  name: string
  summary: string
  longDescription: string
  officialUrl: string
  avgRating: number
  viewCounts: number
  categories: CategoryItem[]
  logo: string
  createdAt: string
  updatedAt: string
  isFavorited: boolean
}

/** 북마크 토글 응답 */
export type FavoriteToggle = {
  apiId: number
  isFavorited: boolean
}

// ===== Wiki Types =====

/**
 * 위키 내용 조회 응답 데이터
 * Schema: Content
 */
export interface WikiContent {
  content: string
  version: number
}

/**
 * 위키 수정 요청 데이터
 * Schema: EditContent
 */
export interface WikiUpdateRequest {
  content: string
  version: number
}

// ===== Pricing Types (상세 페이지 요금제 연동을 위해 추가됨) =====

/**
 * Pricing API용 타입 정의
 * 상세 페이지의 요금제 정보(Pricing) 탭 및 배지 표시용
 */
export interface ApiPricing {
  apiId: number
  pricingType: string // 'FREE' | 'PAID' | 'MIXED'
  pricingInfoCsv: string
}

/**
 * Pricing API 응답 타입
 */
export interface ApiResponseApiPricing {
  isSuccess: boolean
  code: string
  message: string
  result: ApiPricing
}
