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
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'
import { MobileReviewSection } from '@/components/mobile'

import {
  useApiDetail,
  useWikiContent,
  useWikiUpdate,
  useApiList,
  useApiPricing,
  useDeviceDetect,
} from '@/hooks'
import { usePostFavorite } from '@/hooks/mutations/usePostFavorite'

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

export default function APIDetailPage() {
  const { id } = useParams()
  const apiId = Number(id) || 0
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const { isMobile } = useDeviceDetect()

  // ✅ 서버 데이터 가져오기 (가짜 데이터 로직 삭제됨)
  const { data: finalDetail, isLoading: isDetailLoading, error, fetchApiDetail } = useApiDetail()

  const { mutate: toggleFavorite, isLoading: isToggling } = usePostFavorite()
  const { data: wikiData, fetchWiki } = useWikiContent()
  const { saveWiki } = useWikiUpdate()
  const { data: similarApisData, fetchApiList } = useApiList()
  const { pricing: pricingData } = useApiPricing(apiId)

  const [localFavorite, setLocalFavorite] = useState<boolean | null>(null)
  const isFavorited = localFavorite ?? finalDetail?.isFavorited ?? false

  const [isEditing, setIsEditing] = useState(false)
  const [editedWikiText, setEditedWikiText] = useState<string | null>(null)
  const displayWikiText = editedWikiText !== null ? editedWikiText : wikiData?.content || ''

  useEffect(() => {
    if (apiId) {
      fetchApiDetail(apiId)
      fetchWiki(apiId)
    }
  }, [apiId, fetchApiDetail, fetchWiki])

  useEffect(() => {
    if (finalDetail?.categories?.length && finalDetail.categories[0].categoryId !== 0) {
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
      if (apiId !== 0) {
        const result = await toggleFavorite(apiId)
        if (result.isFavorited !== nextStatus) setLocalFavorite(result.isFavorited)
      }
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

  // ✅ 1. 로딩 중
  if (isDetailLoading) {
    return (
      <>
        <MobileHeader />
        <div className="flex justify-center items-center min-h-[60vh] mt-14 xs:mt-16 md:mt-0">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <MobileBottomNavigation />
      </>
    )
  }

  // ✅ 2. 에러가 있거나, 데이터가 없을 때 -> 에러 화면 출력
  if (error || !finalDetail) {
    return (
      <>
        <MobileHeader />
        <div className="text-center py-12 xs:py-16 md:py-20 text-red-500 font-sans mt-14 xs:mt-20 md:mt-20 px-4">
          <p className="text-lg xs:text-xl font-bold mb-3 xs:mb-4">
            {error ? '데이터를 불러오지 못했습니다.' : '존재하지 않는 API입니다.'}
          </p>
          <p className="mb-4 xs:mb-6 text-gray-600 text-sm xs:text-base">
            {error || '요청하신 데이터를 찾을 수 없습니다.'}
          </p>
          <button
            type="button"
            onClick={() => fetchApiDetail(apiId)}
            className="px-5 xs:px-6 py-2 bg-brand-500 text-white rounded-full text-xs xs:text-sm hover:bg-brand-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
        <MobileBottomNavigation />
      </>
    )
  }

  // ✅ 3. 가격 데이터 표시 로직
  // 서버 값이 있으면 쓰고, 없으면 undefined/null 상태로 둠
  const pricingType = finalDetail.pricingType || pricingData?.pricingType

  // 화면 표시: 값이 있으면 번역, 없으면 '-' 표시
  const displayPricing = pricingType ? (PRICING_LABEL[pricingType] ?? pricingType) : '-'

  return (
    <>
      <MobileHeader />
      <div className="mx-auto px-3 xs:px-4 sm:px-6 md:px-12 lg:px-16 mt-14 xs:mt-16 md:mt-20 lg:mt-28 xl:mt-32 pb-16 xs:pb-20 md:pb-10 2xl:mx-44 font-['Pretendard_Variable']">
        <div className="p-3 xs:p-4 sm:p-5 mb-12 xs:mb-16 md:mb-20 lg:mb-28 flex flex-col md:flex-row justify-between mx-auto items-start md:items-center gap-6 md:gap-8">
          <div className="flex flex-col justify-center gap-1 xs:gap-1.5 md:gap-2 mt-2 xs:mt-3 w-full md:w-auto order-2 md:order-1">
            <h1 className="font-semibold text-xl xs:text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] text-info-darker mb-3 xs:mb-4 md:mb-10 break-words">
              {finalDetail.name}
            </h1>
            <p className="font-medium text-sm xs:text-base md:text-lg lg:text-xl text-info-dark">
              Star {(finalDetail.avgRating || 0).toFixed(1)}
            </p>
            <p className="font-medium text-sm xs:text-base md:text-lg lg:text-xl text-info-dark mb-2 xs:mb-3 md:mb-4">
              {(finalDetail.viewCounts || 0).toLocaleString()} views
            </p>
            {/* 가격 정보 표시 (없으면 - 로 나옴) */}
            <div className="text-zinc-400 text-sm xs:text-base md:text-lg font-normal mb-3 xs:mb-4 md:mb-6">
              {displayPricing}
            </div>

            {finalDetail.officialUrl && (
              <a
                href={finalDetail.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 text-sm xs:text-base md:text-lg font-medium hover:underline mt-1 xs:mt-2"
              >
                공식 사이트
              </a>
            )}
          </div>
          <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[20px] xs:rounded-[30px] md:rounded-[60px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 mt-0 md:mt-10 mx-auto md:mx-0 order-1 md:order-2">
            {finalDetail.logo ? (
              <img
                src={finalDetail.logo}
                alt={finalDetail.name}
                className="w-full h-full object-contain p-2 xs:p-3 md:p-4"
              />
            ) : (
              <span className="text-brand-500 font-semibold text-3xl xs:text-4xl md:text-5xl lg:text-6xl">
                {finalDetail.name ? finalDetail.name.charAt(0).toUpperCase() : 'API'}
              </span>
            )}
          </div>
        </div>

        {/* 하트 및 공유 */}
        <div className="m-2 flex gap-3 xs:gap-4 mb-6 xs:mb-8 md:mb-10">
          <img
            src={isFavorited ? HeartFill : HeartLine}
            alt="찜"
            className="w-6 h-6 xs:w-7 xs:h-7 md:w-8 md:h-8 cursor-pointer"
            onClick={handleToggleFavorite}
          />
          <img src={Share} alt="공유" className="w-6 h-6 xs:w-7 xs:h-7 md:w-8 md:h-8" />
        </div>

        {/* 탭 메뉴 */}
        <div>
          <div className="flex gap-3 xs:gap-4 md:gap-6 font-sans font-medium pb-4 xs:pb-5 md:pb-6 border-b border-[#EEEEEE] overflow-x-auto">
            {MENUS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMenu(key)}
                className={`relative pb-2 xs:pb-2.5 md:pb-3 text-sm xs:text-base md:text-lg lg:text-xl whitespace-nowrap transition-colors ${activeMenu === key ? 'text-info-dark' : 'text-[#B0B0B0]'}`}
              >
                {label}
                {activeMenu === key && (
                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-500" />
                )}
              </button>
            ))}
          </div>
          <div className="mt-4 xs:mt-6 md:mt-8">
            {activeMenu === 'A' && (
              <OverviewSection
                longDescription={finalDetail.longDescription || finalDetail.summary}
                categories={finalDetail.categories}
              />
            )}
            {activeMenu === 'B' && (
              <PricingSection categories={finalDetail.categories} pricing={pricingData} />
            )}
            {activeMenu === 'C' && (isMobile ? <MobileReviewSection /> : <ReviewSection />)}
            {activeMenu === 'D' && <CodeExampleSection />}
          </div>
        </div>

        {/* 위키 영역 */}
        <div className="mt-12 xs:mt-16 md:mt-20">
          <div className="flex flex-col max-w-full md:max-w-[1112px]">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-end mb-2 xs:mb-3 gap-2 xs:gap-0">
              <span className="font-sans font-medium text-lg xs:text-xl md:text-2xl text-info-dark">
                API 위키
              </span>
              <span className="text-gray-500 text-xs xs:text-sm font-sans ">
                마지막 업데이트 버전: <span className="font-bold">{wikiData?.version ?? 0}</span>
              </span>
            </div>
          </div>
          <div className="w-full max-w-full md:max-w-[1112px] border border-brand-500 rounded-lg xs:rounded-xl bg-white overflow-hidden p-3 xs:p-4">
            {isEditing ? (
              <div data-color-mode="light">
                <MDEditor
                  value={displayWikiText}
                  onChange={(val) => setEditedWikiText(val || '')}
                  height={400}
                  preview="edit"
                  className="text-sm xs:text-base"
                />
                <div className="flex justify-end gap-2 xs:gap-3 mt-3 xs:mt-4">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 xs:px-6 py-1.5 xs:py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors text-xs xs:text-sm"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveWiki}
                    className="px-4 xs:px-6 py-1.5 xs:py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors shadow-md text-xs xs:text-sm"
                  >
                    저장하기
                  </button>
                </div>
              </div>
            ) : (
              <div data-color-mode="light" className="p-3 xs:p-4 sm:p-5">
                {wikiData?.content ? (
                  <MDEditor.Markdown
                    source={wikiData.content}
                    style={{ backgroundColor: 'white', color: '#333', minHeight: '200px' }}
                    className="text-sm xs:text-base"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] xs:h-[250px] md:h-[300px] text-gray-400 text-sm xs:text-base">
                    <p>아직 등록된 위키 내용이 없습니다.</p>
                    <p>첫 번째 기여자가 되어보세요!</p>
                  </div>
                )}
                <div className="flex justify-end mt-4 xs:mt-6 pt-3 xs:pt-4 border-t border-gray-100">
                  <button
                    onClick={handleStartEdit}
                    className="px-4 xs:px-6 py-1.5 xs:py-2 border-2 border-brand-500 text-brand-500 font-bold rounded-lg hover:bg-brand-50 transition-colors text-xs xs:text-sm"
                  >
                    위키 수정하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 비슷한 API 추천 */}
        <div className="mt-12 xs:mt-16 md:mt-20 mb-12 xs:mb-16 md:mb-20">
          <div className="mb-4 xs:mb-5 md:mb-6">
            <span className="font-medium text-lg xs:text-xl md:text-2xl text-info-darker">
              비슷한 API
            </span>
          </div>
          <div className="flex gap-4 xs:gap-5 md:gap-6 overflow-x-auto pb-4 xs:pb-5 md:pb-6 scroll-smooth scrollbar-hide">
            {similarApisData?.content?.length ? (
              similarApisData.content.map((api) => <APICardSmall key={api.apiId} {...api} />)
            ) : (
              <div className="text-gray-400 text-base xs:text-lg py-8 xs:py-10 w-full text-center">
                비슷한 API가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileBottomNavigation />
    </>
  )
}
