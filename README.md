# APIWIKI Frontend

Vite + React + TypeScript 프로젝트에 Tailwind CSS를 결합해 API 문서 관리 포털의 프런트엔드 기반을 구성했습니다. ESBuild 대안인 `rolldown-vite`가 기본으로 적용되어 빠른 빌드/핫리로드를 제공합니다.

## 개발 환경

- Node.js 18 이상 권장 (현재 devcontainer에서는 22.x 사용)
- 패키지 매니저: npm
- 스타일: Tailwind CSS 3.x, PostCSS, Autoprefixer

## 사용 방법

```bash
npm install        # 의존성 설치
npm run dev        # http://localhost:5173 에서 개발 서버 실행
npm run build      # 타입체크 후 Vite 프로덕션 번들 생성 (dist)
npm run preview    # 빌드 결과를 로컬에서 확인
npm run lint       # ESLint 검사
npm run lint:fix   # ESLint 자동 수정
npm run format     # Prettier 포맷팅
npm run fix        # ESLint 자동 수정 + Prettier 포맷팅 (권장)
npm run test       # Vitest 유닛 테스트 실행
npm run test:ui    # Vitest UI 모드
npm run test:coverage  # 테스트 커버리지 확인
```

## 코드 품질 관리

### 린팅 & 포맷팅

- **ESLint**: `eslint.config.js`에서 Flat Config 방식 사용
  - React 19 최신 규칙 적용
  - `react-hooks/exhaustive-deps` 경고 활성화
  - 커밋 전 `npm run fix` 실행 권장
- **Prettier**: 일관된 코드 스타일 유지
  - `.prettierrc` 설정 파일 사용
  - ESLint와 함께 `npm run fix`로 한번에 실행 가능

### 테스팅

- **Vitest**: 핵심 커스텀 훅에 유닛 테스트 작성
  - `src/hooks/useApi.ts`, `useAuth.ts`, `useBookmark.ts` 등
  - React Testing Library와 함께 사용
  - `src/test/setup.ts`에서 테스트 환경 설정

## AI 개발 지원

### GitHub Copilot 설정

- `docs/Prompt/Instructions.md`: AI 코딩 어시스턴트를 위한 프로젝트 가이드라인
  - 아키텍처 원칙 (로직/뷰 분리)
  - 기술 스택 및 버전 정보
  - 코딩 컨벤션 및 베스트 프랙티스
- `.github/copilot-instructions.md`: PR 작성 시 한국어 사용 가이드

### API 문서

- `docs/swagger.json`: 백엔드 API 명세 (OpenAPI 3.1.0)
  - **중요**: AI에게 전달 시 JSON 형식이 Markdown보다 효율적
  - `docs/api-docs.md`: 사람이 읽기 쉬운 Markdown 버전도 별도 제공
- API 타입: `src/types/api.ts`에서 TypeScript 타입 정의

## Tailwind 설정

- `tailwind.config.js`: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}` 경로를 감시하며 `brand` 컬러 팔레트를 확장했습니다.
- `postcss.config.js`: Tailwind와 Autoprefixer 플러그인을 활성화했습니다.
- `src/index.css`: `@tailwind base/components/utilities` 선언과 기본 타이포그래피/배경 스타일을 정의했습니다.

## 배포

Coolify에서 바로 사용할 수 있도록 Dockerfile을 단일 스테이지로 단순화했습니다.

- Node 22 Alpine 기반으로 `npm ci` → `npm run build`까지 모두 컨테이너 내부에서 실행합니다.
- 런타임은 같은 컨테이너에서 `npm run preview -- --host 0.0.0.0 --port ${PORT:-4173}` 명령을 사용합니다.
- `vite.config.ts`의 `preview.allowedHosts`에 `apiwiki.supabin.com`을 등록해 커스텀 도메인 접근을 허용했습니다.
- 기본 노출 포트는 `4173`이며, Coolify에서 `PORT` 환경 변수를 지정하면 그대로 사용합니다.

배포 순서 (Coolify Git-to-Container 기준)

1. main 브랜치에 변경사항 push
2. Coolify가 리포지토리를 클론하고 Dockerfile 기반으로 빌드
3. 빌드 완료 후 자동으로 새 컨테이너가 뜨고, `apiwiki.supabin.com`에서 서비스 확인

추가적인 GitHub Actions나 외부 레지스트리 푸시는 더 이상 필요하지 않습니다.
