import APICard, { type APICardProps } from '@/components/APICard'
import SearchBar from '@/components/HomePage/SearchBar'
import Filter from '@/assets/icons/action/ic_filter.svg'
import ArrowDown from '@/assets/icons/action/ic_arrow_down.svg'

import { useState } from 'react'

const ExplorePage = () => {
  const apies: APICardProps[] = [
    {
      id: 1,
      title: 'Google Gemini',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'string',
      description:
        '구글의 최신 멀티모달 AI 모델을 활용해 텍스트, 코드, 이미지 처리 기능을 제공합니다.',
    },
    {
      id: 2,
      title: 'Open AI',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'string',
      description:
        'GPT-4o 등 텍스트 생성, 이미지 생성(DALL-E), 음성 인식을 지원하는 가장 핫한 AI API입니다.',
    },
    {
      id: 3,
      title: 'Eleven Labs',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'string',
      description: '가장 자연스러운 AI 음성 합성(TTS) 및 목소리 복제 기능을 제공합니다.',
    },
    {
      id: 4,
      title: 'Kakao Maps',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'string',
      description:
        '국내 특화 기능(로드뷰, 상세 주소 검색 등)이 강력해 한국 서비스 개발 시 필수입니다.',
    },
    {
      id: 5,
      title: 'Mapbox',
      star: '4.2',
      usedBy: '970M people',
      price: 'Paid',
      iconUrl: 'string',
      description:
        '커스텀 디자인 지도를 만들기에 최적화되어 있으며 시각적으로 세련된 앱에 많이 쓰입니다.',
    },
  ]
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <div className="mt-10">
      <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      {/* 카드 영역 */}
      <div className="mt-8">
        {/* 카드 개수 및 필터 */}
        <div className="flex whitespace-nowrap justify-between  sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32">
          <span className="font-sans text-sm text-[#B0B0B0]">1,022개</span>
          <div className="flex gap-6 sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32 font-sans text-lg font-medium text-[#0D3C61]">
            {/* Hide Filters */}
            <div className="flex">
              <span>Hide Filters</span>
              <img src={Filter} alt="필터" />
            </div>
            {/* Sort By */}
            <div className="flex">
              <span>Sort By</span>
              <img src={ArrowDown} alt="정렬" />
            </div>
          </div>
        </div>
        <div
          className="mt-3 gap-10 grid grid-cols-1 
            sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
            sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32
            sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32"
        >
          {apies.map((cat) => (
            <APICard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
