# Explore 페이지 API 연동

## 📝 설명

API 탐색(Explore) 페이지의 백엔드 API 연동을 위한 타입, 서비스 함수, 커스텀 훅을 구현합니다.

---

## 🎯 API 엔드포인트 (swagger.json 기준)

| Method | Path                            | 설명                                 |
| ------ | ------------------------------- | ------------------------------------ |
| GET    | `/api/v1/apis`                  | API 목록 조회 (필터 + 정렬 + 페이징) |
| GET    | `/api/v1/apis/{apiId}`          | API 상세 조회                        |
| POST   | `/api/v1/apis/{apiId}/favorite` | 북마크 토글                          |

---

## ✅ 작업 내용

### 1. `src/types/api.ts` — 타입 추가

기존 `ApiResponse<T>` 제네릭을 재사용하며, Explore 전용 타입을 추가한다.

```ts
// ===== Explore API Types =====

type SortOption = 'LATEST' | 'POPULAR' | 'MOST_REVIEWED'
type SortDirection = 'ASC' | 'DESC'

type PricingType = 'FREE' | 'PAID' | 'MIXED'
type AuthType = 'OAUTH2' | 'REFRESH_TOKEN' | 'ACCESS_TOKEN' | 'API_KEY' | 'JWT' | 'COOKIE' | 'BASIC'

type ProviderCompany =
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

// API 목록 조회 파라미터
type ApiListParams = {
  page?: number // 0-based, 기본값 0
  size?: number // 기본값 16
  categoryId?: number
  q?: string // 검색어
  sort?: SortOption
  direction?: SortDirection
  providers?: ProviderCompany
  authTypes?: AuthType
  pricingTypes?: PricingType
  minRating?: number // 최대 5.0
}

// 페이지네이션 공용 응답
type PageResponse<T> = {
  content: T[]
  totalPage: number
  totalElements: number
  listSize: number
  currentPage: number
  first: boolean
  last: boolean
}

// API 목록 카드 (Preview)
type ApiPreview = {
  apiId: number
  name: string
  summary: string
  avgRating: number
  reviewCount: number
  viewCounts: number
  pricingType: PricingType
  authType: AuthType
  providerCompany: ProviderCompany
  isFavorited: boolean
}

// 카테고리 항목
type CategoryItem = {
  categoryId: number
  name: string
}

// API 상세 조회
type ApiDetail = {
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

// 북마크 토글 응답
type FavoriteToggle = {
  apiId: number
  isFavorited: boolean
}
```

> **참고:** Instructions.md 지침에 따라 `interface` 대신 `type` alias를 사용한다.
> 기존 `APICardData`, `SearchResult` 타입은 향후 `ApiPreview`로 마이그레이션 가능.

---

### 2. `src/services/explore.ts` — 서비스 함수

기존 `auth.ts` 패턴을 따른다: `api` 인스턴스 import → try/catch → 서버 에러 시 response.data 반환.

```
getApiList(params?: ApiListParams): Promise<ApiResponse<PageResponse<ApiPreview>>>
  - GET /api/v1/apis
  - params를 query string으로 전달 (axios params 옵션)
  - undefined인 파라미터는 제외

getApiDetail(apiId: number): Promise<ApiResponse<ApiDetail>>
  - GET /api/v1/apis/{apiId}

toggleFavorite(apiId: number): Promise<ApiResponse<FavoriteToggle>>
  - POST /api/v1/apis/{apiId}/favorite
```

---

### 3. `src/hooks/useExplore.ts` — 커스텀 훅

기존 `useApi<T>` 훅의 `execute()` 패턴을 활용한다.

```
useApiList()
  - useApi<PageResponse<ApiPreview>>() 기반
  - fetchApiList(params?: ApiListParams) 함수 제공
  - data, isLoading, error 상태 반환

useApiDetail()
  - useApi<ApiDetail>() 기반
  - fetchApiDetail(apiId: number) 함수 제공

useFavoriteToggle()
  - useApi<FavoriteToggle>() 기반
  - toggle(apiId: number) 함수 제공
  - onSuccess 콜백으로 낙관적 UI 갱신 가능하도록 설계
```

---

### 4. 배럴 export 갱신

- `src/services/index.ts` — explore 서비스 함수 re-export 추가
- `src/hooks/index.ts` — useExplore 훅 re-export 추가

---

## 📦 의존성

| 파일                  | 역할                      | 상태                       |
| --------------------- | ------------------------- | -------------------------- |
| `src/services/api.ts` | axios 인스턴스 + 인터셉터 | 이미 존재                  |
| `src/hooks/useApi.ts` | 공용 API 호출 훅          | 이미 존재                  |
| `src/types/api.ts`    | 공용 타입 정의            | 이미 존재 (타입 추가 필요) |
| `docs/swagger.json`   | API 명세                  | 참조용                     |

## 📐 아키텍처 (Instructions.md 준수)

```
View (Component)
  └─ useApiList() / useApiDetail() / useFavoriteToggle()   ← hooks/useExplore.ts
       └─ getApiList() / getApiDetail() / toggleFavorite()  ← services/explore.ts
            └─ api (axios instance)                         ← services/api.ts
```

- **로직과 뷰 분리**: 컴포넌트는 훅만 호출, 훅은 서비스만 호출
- **Type Alias 사용**: `interface` 대신 `type` 선호 (Instructions.md)
- **`any` 사용 금지**: 모든 응답에 명시적 타입 지정

## 🔖 참고사항

- page는 **0-based** (swagger 명세)
- 기본 size = **16**
- 모든 필터 파라미터는 **선택적(optional)** — 조합 가능
- 북마크 토글은 **동일 엔드포인트 재호출 시 취소** (토글 방식)
- JWT 인증 필요 — `api.ts` 인터셉터에서 자동 처리됨
