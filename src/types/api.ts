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
  | 'NONE'

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
  providers?: ProviderCompany[]
  authTypes?: AuthType[]
  pricingTypes?: PricingType[]
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
  pricingType: string | undefined
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
  wiki?: WikiItem
}

/** 북마크 토글 응답 */
export type FavoriteToggle = {
  apiId: number
  isFavorited: boolean
}

// ===== Pricing Types =====

/**
 * Pricing API용 타입 정의
 * 상세 페이지의 요금제 정보(Pricing) 탭 및 배지 표시용
 */
export interface ApiPricing {
  apiId: number
  pricingType: string
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

/** 북마크 데이터 */
export interface ActivityItem {
  apiId: number
  name: string
  summary: string
  avgRating: number
  reviewCount: number
  viewCounts: number
  pricingType: 'FREE' | 'PAID'
  authType: 'OAUTH2' | 'API_KEY' | 'NONE'
  providerCompany: 'KAKAO' | 'NAVER' | 'ETC'
  isFavorited: boolean
}

export interface ActivityGroup {
  date: string
  count: number
  activities: ActivityItem[]
}

// ===== Review API Types  =====

/** * 리뷰 작성 요청 데이터
 * Schema: PostReviewRequest
 */
export interface PostReviewRequest {
  rating: number
  comment: string
}

/** * 리뷰 작성 결과 데이터
 * Schema: PostReviewResult
 */
export interface PostReviewResult {
  rating: number
  comment: string
}

/** * 리뷰 목록 조회를 위한 개별 리뷰 데이터
 * 주의: 백엔드 API에서 reviewId를 제공하지 않으므로 삭제 기능이 제한될 수 있음
 */
export interface ReviewItem {
  reviewId?: number // optional로 변경
  nickname: string
  rating: number
  comment: string
  createdAt: string
  updatedAt?: string // optional로 변경
}

/**
 * 리뷰 목록 조회 결과 (평균 평점 + 페이지네이션)
 */
export interface ReviewList {
  totalRating: number
  reviewCount: number
  reviews: PageResponse<ReviewItem>
}

/**
 * 리뷰 작성 응답 타입
 */
export type PostReviewResponse = ApiResponse<PostReviewResult>

/**
 * 리뷰 목록 조회 응답 타입
 */
export type ReviewListResponse = ApiResponse<ReviewList>

// ===== Review Delete Types  =====

/** * 리뷰 삭제 경로 파라미터
 */
export interface DeleteReviewPathParams {
  apiId: number
  reviewId: number
}

// ===== User Types (MyProfile) =====

export interface MyProfile {
  nickname: string
}

/** 내 프로필 응답 타입 */
export type MyProfileResponse = ApiResponse<MyProfile>

// ===== Wiki Types =====

/** 위키 아이템 (API 상세 조회 응답에 포함) */
export interface WikiItem {
  wikiId: number
  contentMd: string
  version: number
  lastEditorNickname: string
  updatedAt: string
}

/** 위키 내용 조회 응답 데이터 */
export interface WikiContent {
  content: string
  version: number
}

/** 위키 수정 요청 데이터 */
export interface WikiUpdateRequest {
  content: string
  version: number
}

/** 사용자의 위키 편집 내역 항목 */
export interface WikiHistoryItem {
  requestId: number
  apiId: number
  apiName: string
  editedAt: string
}

/** 위키 편집 목록 조회 파라미터 */
export type WikiHistoryParams = {
  page?: number
  size?: number
}

/** 위키 편집 목록 응답 타입 */
export type MyWikiHistory = ApiResponse<PageResponse<WikiHistoryItem>>

// ===== Mobile Component Types =====

/** 모바일용 API 카드 타입 */
export type MobileAPI = {
  id: number
  name: string
  description: string
  logo?: string
  rating?: number
  users?: string
  price: 'free' | 'paid' | 'mixed'
}

/** 모바일용 뉴스 아이템 타입 */
export type MobileNewsItem = {
  id: string
  title: string
  content: string
  author: string
  date: string
}
