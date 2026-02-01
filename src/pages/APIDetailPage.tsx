import { useParams } from 'react-router-dom'

import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import Share from '@/assets/icons/action/ic_share.svg'
import { useState } from 'react'
import OverviewSection from '@/components/APIDetail/OverviewSection'
import PricingSection from '@/components/APIDetail/PricingSection'
import ReviewSection from '@/components/APIDetail/ReviewSection'
import CodeExampleSection from '@/components/APIDetail/CodeExampleSection'
import { useBookmark } from '@/context/BookmarkContext'
import { apiData } from '@/data/mockData'
import APICardSmall from '@/components/APICardSmall'

const MENUS = [
  { key: 'A', label: '개요' },
  { key: 'B', label: '비용정보' },
  { key: 'C', label: '후기' },
  { key: 'D', label: '코드예제' },
] as const

export default function APIDetailPage() {
  const { id } = useParams()
  const apiId = Number(id)
  const api = apiData.find((item) => item.id === apiId)
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')

  const { toggleBookmark, isBookmarked } = useBookmark()

  const bookmarked = isBookmarked(apiId)

  return (
    <div className="mx-auto px-16 mt-32 2xl:mx-44">
      {/* 메인 영역 */}
      <div className="p-5">
        {/* api 상세정보 + 이미지 */}
        <div className="mb-28">
          {/* 아이콘과 텍스트가 가로로 배치되는 영역 */}
          <div className="flex justify-between mx-auto items-center">
            <div className="flex flex-col justify-center gap-2 mt-3 w-full md:w-auto">
              <h1 className="font-semibold text-[50px] text-info-darker mb-10">{api?.title}</h1>
              <p className="font-medium text-2xl text-info-dark">Star {api?.star}</p>
              <p className="font-medium text-2xl text-info-dark mb-4">Used by {api?.usedBy}</p>
              <p className="font-normal text-xl text-[#B0B0B0]">{api?.price}</p>
            </div>
            {/* api 이미지 */}
            <div className="w-72 h-72 rounded-[60px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 mt-10 md:mt-0">
              <img src={api?.iconUrl} alt={api?.title} className="w-full h-full object-contain " />
            </div>
          </div>
        </div>
        {/* 하트 및 공유 / 하단 메뉴 */}
        <div className="m-2">
          {/* 하트 및 공유 */}
          <div className="flex gap-4 mb-10">
            <img
              src={bookmarked ? HeartFill : HeartLine}
              alt="찜"
              className="w-8 h-8 cursor-pointer"
              onClick={() => toggleBookmark(apiId)}
            />

            <img src={Share} alt="공유" />
          </div>
          {/* 메뉴 */}
          <div className="">
            <div className="flex gap-6 font-sans font-medium pb-6 ">
              {MENUS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveMenu(key)}
                  className={`
                                relative pb-3 text-2xl transition-colors
                                ${activeMenu === key ? 'text-info-dark' : 'text-[#B0B0B0]'}
                                `}
                >
                  {label}
                  {activeMenu === key && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-[1px] bg-info-dark/80" />
                  )}
                </button>
              ))}
            </div>
            {/* 내용물 */}
            <div>
              {activeMenu === 'A' && <OverviewSection />}

              {activeMenu === 'B' && <PricingSection />}

              {activeMenu === 'C' && <ReviewSection />}

              {activeMenu === 'D' && <CodeExampleSection />}
            </div>
          </div>
          {/* API 위키 */}
          <div>
            <span className="font-sans font-medium text-2xl text-info-dark">API 위키</span>
            <div className="w-full max-w-[1112px] h-[580px] bg-white border border-brand-500 rounded-xl mt-3 mb-10" />
          </div>
          {/* 비슷한 api */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-medium text-info-dark">비슷한 API</span>
            </div>

            <div className="flex gap-10 overflow-hidden pb-20">
              {apiData.map((data) => (
                <APICardSmall key={data.id} {...data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
