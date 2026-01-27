export interface ApiDataType {
  id: number
  date: string
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description: string
}

export const apiData: ApiDataType[] = [
  // 모든 데이터 날짜 통일: 2025.12.30
  {
    id: 1,
    date: '2025.12.30',
    title: 'Google Gemini',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: 'https://placehold.co/117x109',
    description:
      '구글의 최신 멀티모달 AI 모델을 활용해 텍스트, 코드, 이미지 처리 기능을 제공합니다.',
  },
  {
    id: 2,
    date: '2025.12.30',
    title: 'Open AI',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: 'https://placehold.co/117x109',
    description:
      'GPT-4o 등 텍스트 생성, 이미지 생성(DALL-E), 음성 인식을 지원하는 가장 핫한 AI API입니다.',
  },
  {
    id: 3,
    date: '2025.12.30',
    title: 'Eleven Labs',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: 'https://placehold.co/117x109',
    description: '가장 자연스러운 AI 음성 합성(TTS) 및 목소리 복제 기능을 제공합니다.',
  },
  {
    id: 4,
    date: '2025.12.30',
    title: 'Kakao Maps',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: 'https://placehold.co/117x109',
    description:
      '국내 특화 기능(로드뷰, 상세 주소 검색 등)이 강력해 한국 서비스 개발 시 필수입니다.',
  },
  {
    id: 5,
    date: '2025.12.30',
    title: 'Mapbox',
    star: '4.2',
    usedBy: '970M people',
    price: 'Paid',
    iconUrl: 'https://placehold.co/117x109',
    description:
      '커스텀 디자인 지도를 만들기에 최적화되어 있으며 시각적으로 세련된 앱에 많이 쓰입니다.',
  },
]
