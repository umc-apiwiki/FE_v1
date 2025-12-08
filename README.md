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
```

## Tailwind 설정

- `tailwind.config.js`: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}` 경로를 감시하며 `brand` 컬러 팔레트를 확장했습니다.
- `postcss.config.js`: Tailwind와 Autoprefixer 플러그인을 활성화했습니다.
- `src/index.css`: `@tailwind base/components/utilities` 선언과 기본 타이포그래피/배경 스타일을 정의했습니다.

## 배포

멀티 스테이지 Dockerfile이 Node 22 Alpine 이미지를 사용해 빌드와 서빙을 모두 처리합니다.

- 1단계: `npm install` 후 `npm run build`로 `dist` 생성.
- 2단계: `dist`와 `node_modules`만 복사해 경량 런타임을 만들고, `npm run preview -- --host 0.0.0.0 --port ${PORT:-4173}`로 SPA를 서빙.
- 컨테이너는 기본적으로 `4173` 포트를 노출하며, Coolify 등에서 `PORT` 환경 변수를 주입하면 해당 값을 그대로 사용합니다.

배포 시에는 `npm run build` → Docker 이미지 빌드 → 이미지 푸시 → Coolify 서비스 업데이트 순으로 진행하면 됩니다.
