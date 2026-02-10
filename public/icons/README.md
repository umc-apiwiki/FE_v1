# PWA 아이콘 생성 가이드

현재 SVG 아이콘(`/public/icon.svg`)이 설정되어 있습니다.
PNG 아이콘이 필요한 경우, 다음 방법 중 하나를 사용하세요:

## 방법 1: 온라인 도구 사용

1. https://realfavicongenerator.net/ 방문
2. SVG 파일 업로드
3. 다양한 크기의 PNG 생성
4. `/public/icons/` 폴더에 저장

## 방법 2: ImageMagick 사용 (로컬)

```bash
# ImageMagick 설치 필요
convert public/icon.svg -resize 192x192 public/icons/icon-192x192.png
convert public/icon.svg -resize 512x512 public/icons/icon-512x512.png
```

## 방법 3: 빌드 시 자동 생성

현재 설정에서는 SVG 아이콘이 기본적으로 사용되므로,
PNG 아이콘이 없어도 PWA가 정상 작동합니다.

## 생성해야 할 아이콘 크기

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192 (필수)
- 384x384
- 512x512 (필수)

모든 파일은 `/public/icons/` 폴더에 `icon-{size}.png` 형식으로 저장하세요.
