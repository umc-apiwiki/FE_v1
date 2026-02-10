# PWA (Progressive Web App) 설정 가이드

## 개요

API Wiki는 PWA로 구성되어 있어, 모바일 기기에서 네이티브 앱처럼 사용할 수 있습니다.

## 주요 기능

### ✅ 오프라인 지원

- 서비스 워커를 통한 캐시 관리
- 네트워크 없이도 기본 기능 사용 가능

### ✅ 홈 화면 추가

- 모바일 기기의 홈 화면에 앱 아이콘 추가
- 전체 화면 모드로 실행

### ✅ 빠른 로딩

- 리소스 프리캐싱으로 즉각적인 로딩
- 폰트 및 API 응답 캐싱

## 설정 파일

### 1. manifest.json

- 위치: `public/manifest.json`
- PWA 메타데이터 (이름, 아이콘, 테마 색상 등)

### 2. vite.config.ts

- `vite-plugin-pwa` 설정
- 서비스 워커 및 캐싱 전략 구성

### 3. 아이콘

- 위치: `public/icons/`
- 다양한 크기의 PNG 아이콘 (72px ~ 512px)
- 원본: `public/logo.svg`

## 캐싱 전략

### 폰트 캐싱

- **전략**: CacheFirst
- **유효기간**: 1년
- Google Fonts 및 Google Fonts Static

### API 캐싱

- **전략**: NetworkFirst
- **유효기간**: 5분
- supabin.com API 응답

### 정적 리소스

- JS, CSS, HTML, 이미지, 폰트 파일 자동 캐싱

## 개발 가이드

### 아이콘 재생성

로고를 변경한 경우, 다음 명령어로 PWA 아이콘을 재생성할 수 있습니다:

```bash
npm run generate:icons
```

이 명령어는 `public/logo.svg`를 다양한 크기의 PNG로 변환합니다.

### 빌드

```bash
npm run build
```

빌드 시 자동으로:

- `dist/sw.js` - 서비스 워커 생성
- `dist/manifest.webmanifest` - 매니페스트 파일 생성
- 필요한 리소스 프리캐시 설정

### 미리보기

```bash
npm run preview
```

프로덕션 빌드를 로컬에서 테스트할 수 있습니다.

## 설치 방법 (사용자용)

### iOS (Safari)

1. Safari에서 API Wiki 접속
2. 하단 중앙의 공유 버튼 탭
3. "홈 화면에 추가" 선택
4. "추가" 버튼 탭

### Android (Chrome)

1. Chrome에서 API Wiki 접속
2. 우측 상단 메뉴 (⋮) 탭
3. "홈 화면에 추가" 선택
4. "추가" 버튼 탭

### Desktop (Chrome/Edge)

1. 브라우저에서 API Wiki 접속
2. 주소 표시줄 우측의 설치 아이콘 클릭
3. "설치" 버튼 클릭

## 트러블슈팅

### 서비스 워커가 업데이트되지 않음

```bash
# 브라우저 개발자 도구 > Application > Service Workers
# "Update on reload" 체크
# 또는 "Unregister" 후 새로고침
```

### 캐시 초기화

```bash
# 브라우저 개발자 도구 > Application > Cache Storage
# 각 캐시 항목 우클릭 > Delete
```

### 빌드 오류: maximumFileSizeToCacheInBytes

큰 파일이 있을 경우, `vite.config.ts`에서 제한 증가:

```typescript
workbox: {
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
}
```

## 참고 자료

- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
