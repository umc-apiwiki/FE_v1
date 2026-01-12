import APICard from '../components/APICard';
import APICarousel from '../components/APICarousel';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';

interface APIData {
  title: string;
  star: string;
  usedBy: string;
  price: string;
  iconUrl: string;
  description?: string;
}

interface NewsData {
  title: string;
  publisher: string;
  thumb: string;
}

function SearchTag({ label }: { label: string }) {
  return (
    <div className="group relative cursor-pointer flex-shrink-0">
      <div className="px-5 py-2 bg-white rounded-3xl shadow-[1px_1px_5px_1px_rgba(33,150,243,0.10)] border border-sky-500 transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center min-w-[80px]">
        <span className="text-sky-500 text-lg font-medium">{label}</span>
      </div>
      <div className="absolute inset-0 px-5 py-2 bg-sky-500 rounded-3xl shadow-[1px_1px_5px_1px_rgba(33,150,243,0.10)] border border-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-lg font-medium">{label}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const popularAPIs: APIData[] = [
    {
      title: 'Youtube',
      star: '4.8',
      usedBy: '1.2B people',
      price: 'Free',
      iconUrl: '/images/YouTube.svg',
    },
    {
      title: 'OpenStreetMap',
      star: '4.1',
      usedBy: '760M people',
      price: 'Mixed',
      iconUrl: '/images/OpenStreetMap.svg',
    },
    {
      title: 'Google Login',
      star: '4.7',
      usedBy: '2.1B people',
      price: 'Free',
      iconUrl: '/images/Google Login.svg',
    },
    {
      title: 'Open AI',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: '/images/Open AI.svg',
    },
    {
      title: 'Gmail',
      star: '4.9',
      usedBy: '45M people',
      price: 'Free',
      iconUrl: '/images/Gmail.svg',
    },
  ];

  const suggestAPIs: APIData[] = [
    {
      title: '국토부 2D지도API',
      star: '4.8',
      usedBy: '1.2B people',
      price: 'Free',
      iconUrl: '/images/국토부 2D지도API.svg',
    },
    {
      title: 'Naver',
      star: '4.3',
      usedBy: '820M people',
      price: 'Mixed',
      iconUrl: '/images/Naver.svg',
    },
    {
      title: '카카오페이',
      star: '3.6',
      usedBy: '120M people',
      price: 'Free',
      iconUrl: '/images/카카오페이.svg',
    },
    {
      title: 'AWS API',
      star: '4.8',
      usedBy: '990M people',
      price: 'Paid',
      iconUrl: '/images/AWS API.svg',
    },
    {
      title: '네이버 지도',
      star: '3.7',
      usedBy: '34M people',
      price: 'Paid',
      iconUrl: '/images/네이버지도.svg',
    },
  ];

  const newsItems: NewsData[] = [
    {
      title: '"쿠팡 중국인 피의자, 20년 경력개발자 위 개발자"',
      publisher: 'https://placehold.co/96x14',
      thumb: 'https://placehold.co/310x150',
    },
    {
      title: 'AI가 코드 짜는 시대, 개발자의 역할은...',
      publisher: 'https://placehold.co/43x14',
      thumb: 'https://placehold.co/310x150',
    },
    {
      title: '"대기업 꿈꾸다 이젠 해외로"',
      publisher: 'https://placehold.co/36x20',
      thumb: 'https://placehold.co/310x150',
    },
    {
      title: 'NIA-경기도경제과학진흥원, 업무협약',
      publisher: 'https://placehold.co/64x14',
      thumb: 'https://placehold.co/310x150',
    },
    {
      title: '업스테이지, 일본 AI시장 공략',
      publisher: 'https://placehold.co/107x14',
      thumb: 'https://placehold.co/310x150',
    },
  ];

  const detailListData1: APIData[] = [
    {
      title: 'Google Gemini',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '구글의 최신 멀티모달 AI 모델을 활용해 기능을 제공합니다.',
    },
    {
      title: 'Open AI',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: 'GPT-4o 등 텍스트 생성 기능을 지원합니다.',
    },
    {
      title: 'Eleven Labs',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '가장 자연스러운 AI 음성 합성 기능을 제공합니다.',
    },
    {
      title: 'Google Maps',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '지도 표시, 경로 찾기 등 위치 서비스의 표준입니다.',
    },
    {
      title: 'Kakao Maps',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '국내 특화 기능이 강력한 한국 전용 지도입니다.',
    },
    {
      title: 'Mapbox',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '커스텀 디자인 지도를 만들기에 최적화되어 있습니다.',
    },
    {
      title: 'Stripe',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '전 세계 온라인 결제의 표준 서비스입니다.',
    },
    {
      title: 'PayPal',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/100x100',
      description: '글로벌 전자상거래 간편 결제 API입니다.',
    },
  ];

  const detailListData2: APIData[] = [
    {
      title: 'Toss Payments',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '국내 결제 환경에 최적화된 API입니다.',
    },
    {
      title: 'Discord',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '커뮤니티 봇 제작이나 알림 연동에 사용됩니다.',
    },
    {
      title: 'Slack',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '협업 툴 슬랙에 자동화 도구를 통합합니다.',
    },
    {
      title: 'Meta Graph',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: 'SNS 게시물 관리 및 분석 데이터를 다룹니다.',
    },
    {
      title: 'Notion',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '노션 페이지를 데이터베이스로 사용합니다.',
    },
    {
      title: 'Twilio',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: 'SMS, 음성 전화 자동화의 글로벌 강자입니다.',
    },
    {
      title: 'Send Grid',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '대량 이메일 발송 자동화에 특화되어 있습니다.',
    },
    {
      title: 'GitHub',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '깃허브의 모든 기능을 제어할 수 있습니다.',
    },
  ];

  const detailListData3: APIData[] = [
    {
      title: 'Google Gemini',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '구글 최신 모델 기능을 제공합니다.',
    },
    {
      title: 'Open AI',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: 'GPT-4o 등 최신 API를 지원합니다.',
    },
    {
      title: 'Eleven Labs',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '자연스러운 AI 음성 합성 기능입니다.',
    },
    {
      title: 'Google Maps',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '지도 및 경로 데이터의 표준입니다.',
    },
    {
      title: 'Kakao Maps',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '한국 내 특화 지도를 제공합니다.',
    },
    {
      title: 'Mapbox',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '세련된 디자인 지도를 위한 API입니다.',
    },
    {
      title: 'Stripe',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '글로벌 온라인 결제 로직을 구현합니다.',
    },
    {
      title: 'PayPal',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '가장 널리 쓰이는 간편 결제 시스템입니다.',
    },
  ];

  const detailListData4: APIData[] = [
    {
      title: 'Toss Payments',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '한국 결제 환경에 최적화된 API입니다.',
    },
    {
      title: 'Discord',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '커뮤니티 봇 제작 및 연동을 지원합니다.',
    },
    {
      title: 'Slack',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '업무 자동화 및 앱 통합 서비스입니다.',
    },
    {
      title: 'Meta Graph',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: 'SNS 데이터 관리 및 분석을 다룹니다.',
    },
    {
      title: 'Notion',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '노션 내용을 자동 업데이트합니다.',
    },
    {
      title: 'Twilio',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '글로벌 메시징 자동화 서비스입니다.',
    },
    {
      title: 'Send Grid',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '대량 이메일 발송 특화 서비스입니다.',
    },
    {
      title: 'GitHub',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/117x109',
      description: '깃허브의 모든 기능을 제어합니다.',
    },
  ];

  const detailListData5: APIData[] = [
    {
      title: '네이버 로그인',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버 아이디로 쉽고 안전한 로그인을 구현합니다.',
    },
    {
      title: '네이버 검색',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버의 방대한 검색 결과를 가져옵니다.',
    },
    {
      title: '단축 URL API',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '긴 URL을 짧은 주소로 변환합니다.',
    },
    {
      title: '캡차 API',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '이미지나 음성 퀴즈로 자동 가입을 방지합니다.',
    },
    {
      title: 'Hyper LLM',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버의 거대 언어 모델을 활용합니다.',
    },
    {
      title: '데이터랩',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버 검색 트렌드 데이터를 조회합니다.',
    },
    {
      title: '프리미엄 로그 분석',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '유입 경로와 방문자 행동을 분석합니다.',
    },
    {
      title: 'SENS',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: 'SMS, 알림톡, Push 발송 기능을 제공합니다.',
    },
    {
      title: 'Object Storage',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '클라우드 저장소 연동 API입니다.',
    },
    {
      title: 'Papago 번역',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '실시간 번역을 높은 정확도로 제공합니다.',
    },
    {
      title: '카페/블로그',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버 카페 및 블로그 기능을 연동합니다.',
    },
    {
      title: 'Naver Works',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '네이버웍스 연동 및 메시지 봇 생성을 지원합니다.',
    },
    {
      title: 'Dynamic Map',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '화면에 대화형 지도를 삽입합니다.',
    },
    {
      title: 'Geocoding',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '주소와 좌표를 상호 변환합니다.',
    },
    {
      title: 'Search Places',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '주변의 장소나 업체 정보를 검색합니다.',
    },
    {
      title: 'Direction',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '교통 수단별 경로 데이터를 제공합니다.',
    },
    {
      title: 'CLOVA Speech',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '음성을 텍스트로 자동 변환합니다.',
    },
    {
      title: 'CLOVA Voice',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '텍스트를 자연스러운 목소리로 읽어줍니다.',
    },
    {
      title: 'CLOVA FR',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'https://placehold.co/103x96',
      description: '얼굴 감지 및 닮은꼴 찾기 기능을 제공합니다.',
    },
  ];

  const searchTags = [
    '결제',
    '소셜로그인',
    '지도',
    '날씨',
    'AI',
    '이메일',
    '금융',
    '데이터',
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#f0f7ff_0%,_#ffffff_100%)] pt-20 flex flex-col items-center overflow-x-hidden pb-40">
      <section className="flex flex-col items-center mb-24 w-full">
        <h1 className="text-8xl font-bold text-slate-900 mb-10 tracking-tight">
          API Wiki
        </h1>
        <SearchBar />
      </section>

      <APICarousel title="인기 API">
        {popularAPIs.map((api, i) => (
          <APICard key={i} {...api} />
        ))}
      </APICarousel>
      <APICarousel title="제안 API">
        {suggestAPIs.map((api, i) => (
          <APICard key={i} {...api} />
        ))}
      </APICarousel>
      <APICarousel title="최신 뉴스">
        {newsItems.map((news, i) => (
          <NewsCard
            key={i}
            title={news.title}
            publisherLogoUrl={news.publisher}
            thumbnailUrl={news.thumb}
          />
        ))}
      </APICarousel>

      {/* 목록 1, 2, 5 */}
      {[
        { title: '목록 1', data: detailListData1, isLarge: false },
        { title: '목록 2', data: detailListData2, isLarge: false },
        { title: '목록 3', data: detailListData3, isLarge: true },
        { title: '목록 4', data: detailListData4, isLarge: true },
        { title: '목록 5', data: detailListData5, isLarge: false },
      ].map((list, idx) => (
        <section
          key={idx}
          className={`w-full max-w-[1240px] px-10 ${
            idx === 4 ? 'mb-40' : 'mb-20'
          }`}
        >
          <h2 className="text-purple-500 text-2xl font-bold mb-12 flex items-center gap-2">
            <span className="text-xl">❖</span> {list.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {list.data.map((item, i) => (
              <APICard
                key={i}
                {...item}
                isDetail={true}
                isLarge={list.isLarge}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="w-full max-w-4xl flex flex-col items-center gap-12 mt-20 border-t border-sky-100 pt-32 pb-20">
        <SearchBar />
        <div className="flex flex-wrap justify-center gap-6 px-10">
          {searchTags.map((tag, i) => (
            <SearchTag key={i} label={tag} />
          ))}
        </div>
      </section>
    </div>
  );
}
