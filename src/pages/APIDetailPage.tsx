import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import MDEditor from '@uiw/react-md-editor'

import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import Share from '@/assets/icons/action/ic_share.svg'
import OverviewSection from '@/components/APIDetail/OverviewSection'
import PricingSection from '@/components/APIDetail/PricingSection'
import ReviewSection from '@/components/APIDetail/ReviewSection'
import CodeExampleSection from '@/components/APIDetail/CodeExampleSection'
import APICardSmall from '@/components/APICardSmall'

import { useApiDetail, useWikiContent, useWikiUpdate, useApiList, useApiPricing } from '@/hooks'
import { usePostFavorite } from '@/hooks/mutations/usePostFavorite'
import type { ApiDetail } from '@/types/api'

const MENUS = [
  { key: 'A', label: '개요' },
  { key: 'B', label: '비용정보' },
  { key: 'C', label: '후기' },
  { key: 'D', label: '코드예제' },
] as const

const PRICING_LABEL: Record<string, string> = {
  FREE: 'Free',
  PAID: 'Paid',
  MIXED: 'Free & Paid',
}

const MOCK_DATA: Record<number, ApiDetail & { pricingType?: string }> = {
  1: {
    apiId: 1,
    name: 'YouTube Data API',
    summary: 'YouTube의 동영상, 채널, 재생목록 등을 관리할 수 있는 API입니다.',
    longDescription:
      'YouTube Data API를 사용하면 애플리케이션에 YouTube 기능을 통합할 수 있습니다...',
    officialUrl: 'https://developers.google.com/youtube/v3',
    avgRating: 4.8,
    viewCounts: 1200000000,
    categories: [{ categoryId: 101, name: 'Video' }],
    logo: '/images/YouTube.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorited: false,
    pricingType: 'FREE',
  },
  2: {
    apiId: 2,
    name: 'OpenStreetMap',
    summary: '전 세계의 무료 지도 데이터를 제공하는 오픈 소스 프로젝트입니다.',
    longDescription: 'OpenStreetMap(OSM)은 누구나 편집할 수 있는 무료 지도 데이터베이스입니다...',
    officialUrl: 'https://www.openstreetmap.org',
    avgRating: 4.1,
    viewCounts: 760000000,
    categories: [{ categoryId: 102, name: 'Map' }],
    logo: '/images/OpenStreetMap.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorited: false,
    pricingType: 'MIXED',
  },
  3: {
    apiId: 3,
    name: 'Google Login',
    summary: 'Google 계정을 사용하여 간편하고 안전하게 로그인할 수 있는 API입니다.',
    longDescription:
      'Google Identity Services를 통해 사용자가 Google 계정으로 빠르고 안전하게 로그인할 수 있도록 지원합니다...',
    officialUrl: 'https://developers.google.com/identity',
    avgRating: 4.7,
    viewCounts: 2100000000,
    categories: [{ categoryId: 103, name: 'Auth' }],
    logo: '/images/Google Login.svg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorited: false,
    pricingType: 'FREE',
  },
}

export default function APIDetailPage() {
  const { id } = useParams()
  const apiId = Number(id)
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')

  const {
    data: serverApiDetail,
    isLoading: isDetailLoading,
    error,
    fetchApiDetail,
  } = useApiDetail()
  const { mutate: toggleFavorite, isLoading: isToggling } = usePostFavorite()
  const { data: wikiData, fetchWiki } = useWikiContent()
  const { saveWiki } = useWikiUpdate()
  const { data: similarApisData, fetchApiList } = useApiList()

  // 수정됨: pricingData는 훅 내부에서 apiId를 인자로 받아 자동으로 처리됨
  const { pricing: pricingData } = useApiPricing(apiId)

  const finalDetail = (MOCK_DATA[apiId] || serverApiDetail) as ApiDetail & { pricingType?: string }

  const [localFavorite, setLocalFavorite] = useState<boolean | null>(null)
  const isFavorited = localFavorite ?? finalDetail?.isFavorited ?? false

  const [isEditing, setIsEditing] = useState(false)
  const [editedWikiText, setEditedWikiText] = useState<string | null>(null)
  const displayWikiText = editedWikiText !== null ? editedWikiText : wikiData?.content || ''

  useEffect(() => {
    if (apiId) {
      fetchApiDetail(apiId)
      fetchWiki(apiId)
      // fetchApiPricing(apiId) -> 삭제됨: useApiPricing 훅 내부 useEffect에서 자동 호출됨
    }
  }, [apiId, fetchApiDetail, fetchWiki])

  useEffect(() => {
    if (finalDetail?.categories?.length) {
      fetchApiList({ categoryId: finalDetail.categories[0].categoryId, size: 5, sort: 'POPULAR' })
    } else if (finalDetail) {
      fetchApiList({ size: 5, sort: 'POPULAR' })
    }
  }, [finalDetail, fetchApiList])

  const handleToggleFavorite = useCallback(async () => {
    if (isToggling) return
    const nextStatus = !isFavorited
    setLocalFavorite(nextStatus)
    try {
      const result = await toggleFavorite(apiId)
      if (result.isFavorited !== nextStatus) setLocalFavorite(result.isFavorited)
    } catch {
      setLocalFavorite(!nextStatus)
    }
  }, [apiId, isFavorited, toggleFavorite, isToggling])

  const handleSaveWiki = async () => {
    if (!displayWikiText.trim()) return alert('내용을 입력해주세요.')
    try {
      const currentVersion = wikiData?.version ?? 0
      await saveWiki(apiId, { content: displayWikiText, version: currentVersion })
      alert('위키가 저장되었습니다!')
      await fetchWiki(apiId)
      setIsEditing(false)
      setEditedWikiText(null)
    } catch {
      alert('위키 저장에 실패했습니다.')
    }
  }

  const handleCancelEdit = () => {
    if (window.confirm('수정을 취소하시겠습니까? 작성 중인 내용은 사라집니다.')) {
      setEditedWikiText(null)
      setIsEditing(false)
    }
  }

  const handleStartEdit = () => {
    setEditedWikiText(wikiData?.content || '')
    setIsEditing(true)
  }

  if (isDetailLoading && !finalDetail)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )

  if (error && !finalDetail)
    return (
      <div className="text-center py-20 text-red-500 font-sans">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => fetchApiDetail(apiId)}
          className="mt-4 px-6 py-2 bg-brand-500 text-white rounded-full text-sm"
        >
          다시 시도
        </button>
      </div>
    )

  if (!finalDetail) return null

  const pricingType = finalDetail.pricingType || pricingData?.pricingType || 'FREE'
  const displayPricing = PRICING_LABEL[pricingType] ?? pricingType

  return (
    <div className="mx-auto px-16 mt-32 2xl:mx-44 font-['Pretendard_Variable']">
      <div className="p-5 mb-28 flex justify-between mx-auto items-center">
        <div className="flex flex-col justify-center gap-2 mt-3 w-full md:w-auto">
          <h1 className="font-semibold text-[50px] text-info-darker mb-10">{finalDetail.name}</h1>
          <p className="font-medium text-2xl text-info-dark">
            Star {finalDetail.avgRating.toFixed(1)}
          </p>
          <p className="font-medium text-2xl text-info-dark mb-4">
            {finalDetail.viewCounts.toLocaleString()} views
          </p>
          <div className="text-zinc-400 text-xl font-normal mb-6">{displayPricing}</div>
          {finalDetail.officialUrl && (
            <a
              href={finalDetail.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 text-lg font-medium hover:underline mt-2"
            >
              공식 사이트
            </a>
          )}
        </div>
        <div className="w-72 h-72 rounded-[60px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 mt-10 md:mt-0">
          {finalDetail.logo ? (
            <img
              src={finalDetail.logo}
              alt={finalDetail.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <span className="text-brand-500 font-semibold text-6xl">
              {finalDetail.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* 하트 및 공유 */}
      <div className="m-2 flex gap-4 mb-10">
        <img
          src={isFavorited ? HeartFill : HeartLine}
          alt="찜"
          className="w-8 h-8 cursor-pointer"
          onClick={handleToggleFavorite}
        />
        <img src={Share} alt="공유" />
      </div>

      {/* 탭 메뉴 */}
      <div>
        <div className="flex gap-6 font-sans font-medium pb-6 border-b border-[#EEEEEE]">
          {MENUS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMenu(key)}
              className={`relative pb-3 text-2xl transition-colors ${activeMenu === key ? 'text-info-dark' : 'text-[#B0B0B0]'}`}
            >
              {label}
              {activeMenu === key && (
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-500" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {activeMenu === 'A' && (
            <OverviewSection
              longDescription={finalDetail.longDescription || finalDetail.summary}
              categories={finalDetail.categories}
            />
          )}
          {activeMenu === 'B' && (
            <PricingSection categories={finalDetail.categories} pricing={pricingData} />
          )}
          {activeMenu === 'C' && <ReviewSection />}
          {activeMenu === 'D' && <CodeExampleSection />}
        </div>
      </div>

      {/* 위키 */}
      <div className="mt-20">
        <div className="flex flex-col max-w-[1112px]">
          <div className="flex justify-between items-end mb-3">
            <span className="font-sans font-medium text-2xl text-info-dark">API 위키</span>
            <span className="text-gray-500 text-sm font-sans ">
              마지막 업데이트 버전: <span className="font-bold">{wikiData?.version ?? 0}</span>
            </span>
          </div>
        </div>
        <div className="w-full max-w-[1112px] border border-brand-500 rounded-xl bg-white overflow-hidden p-4">
          {isEditing ? (
            <div data-color-mode="light">
              <MDEditor
                value={displayWikiText}
                onChange={(val) => setEditedWikiText(val || '')}
                height={500}
                preview="edit"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveWiki}
                  className="px-6 py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md"
                >
                  저장하기
                </button>
              </div>
            </div>
          ) : (
            <div data-color-mode="light" className="p-5">
              {wikiData?.content ? (
                <MDEditor.Markdown
                  source={wikiData.content}
                  style={{ backgroundColor: 'white', color: '#333', minHeight: '300px' }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                  <p>아직 등록된 위키 내용이 없습니다.</p>
                  <p>첫 번째 기여자가 되어보세요!</p>
                </div>
              )}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleStartEdit}
                  className="px-6 py-2 border-2 border-brand-500 text-brand-500 font-bold rounded-lg hover:bg-brand-50 transition-colors"
                >
                  위키 수정하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 비슷한 API */}
      <div className="mt-20 mb-20">
        <div className="mb-6">
          <span className="font-medium text-2xl text-info-darker">비슷한 API</span>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth scrollbar-hide">
          {similarApisData?.content?.length ? (
            similarApisData.content.map((api) => <APICardSmall key={api.apiId} {...api} />)
          ) : (
            <div className="text-gray-400 text-lg py-10 w-full text-center">
              비슷한 API가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
