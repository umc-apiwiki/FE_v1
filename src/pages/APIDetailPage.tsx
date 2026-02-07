import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import MDEditor from '@uiw/react-md-editor' // 마크다운 에디터 추가

import HeartLine from '@/assets/icons/common/ic_heart_line.svg'
import HeartFill from '@/assets/icons/common/ic_heart_fill.svg'
import Share from '@/assets/icons/action/ic_share.svg'
import OverviewSection from '@/components/APIDetail/OverviewSection'
import PricingSection from '@/components/APIDetail/PricingSection'
import ReviewSection from '@/components/APIDetail/ReviewSection'
import CodeExampleSection from '@/components/APIDetail/CodeExampleSection'
import { useApiDetail, useFavoriteToggle, useWikiContent, useWikiUpdate } from '@/hooks'
import { saveBookmarkDate, removeBookmarkDate } from '@/utils/bookmarkDate'

const MENUS = [
  { key: 'A', label: '개요' },
  { key: 'B', label: '비용정보' },
  { key: 'C', label: '후기' },
  { key: 'D', label: '코드예제' },
] as const

export default function APIDetailPage() {
  const { id } = useParams()
  const apiId = Number(id)
  const [activeMenu, setActiveMenu] = useState<'A' | 'B' | 'C' | 'D'>('A')
  const [isFavorited, setIsFavorited] = useState(false)

  const { data: apiDetail, isLoading, error, fetchApiDetail } = useApiDetail()
  const { toggle } = useFavoriteToggle()

  // ===== Wiki Hooks & State =====
  const { data: wikiData, fetchWiki } = useWikiContent()
  const { saveWiki } = useWikiUpdate()

  // 에디터 상태 관리
  const [wikiText, setWikiText] = useState('')
  const [isEditing, setIsEditing] = useState(false) // 수정 모드 여부

  useEffect(() => {
    if (apiId) {
      fetchApiDetail(apiId)
      fetchWiki(apiId)
    }
  }, [apiId, fetchApiDetail, fetchWiki])

  useEffect(() => {
    if (apiDetail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFavorited(apiDetail.isFavorited)
    }
  }, [apiDetail])

  useEffect(() => {
    if (wikiData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWikiText(wikiData.content)
    }
  }, [wikiData])

  const handleToggleFavorite = useCallback(() => {
    const willBeFavorited = !isFavorited
    setIsFavorited(willBeFavorited)

    toggle(apiId, (result) => {
      if (result.isFavorited) {
        saveBookmarkDate(apiId)
      } else {
        removeBookmarkDate(apiId)
      }
    })
  }, [apiId, isFavorited, toggle])

  // 위키 저장 핸들러
  const handleSaveWiki = async () => {
    if (!wikiText.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    try {
      const currentVersion = wikiData?.version ?? 0
      await saveWiki(apiId, { content: wikiText, version: currentVersion })
      alert('위키가 저장되었습니다!')
      await fetchWiki(apiId)
      setIsEditing(false) // 저장 성공 시 뷰어 모드로 전환
    } catch (e) {
      console.error(e)
      alert('위키 저장에 실패했습니다.')
    }
  }

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    if (window.confirm('수정을 취소하시겠습니까? 작성 중인 내용은 사라집니다.')) {
      setWikiText(wikiData?.content || '') // 원래 내용으로 복구
      setIsEditing(false) // 뷰어 모드로 전환
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
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
  }

  if (!apiDetail) return null

  return (
    <div className="mx-auto px-16 mt-32 2xl:mx-44">
      <div className="p-5">
        {/* API 상세정보 + 로고 */}
        <div className="mb-28">
          <div className="flex justify-between mx-auto items-center">
            <div className="flex flex-col justify-center gap-2 mt-3 w-full md:w-auto">
              <h1 className="font-semibold text-[50px] text-info-darker mb-10">{apiDetail.name}</h1>
              <p className="font-medium text-2xl text-info-dark">
                Star {apiDetail.avgRating.toFixed(1)}
              </p>
              <p className="font-medium text-2xl text-info-dark mb-4">
                {apiDetail.viewCounts.toLocaleString()} views
              </p>
              <p className="font-normal text-xl text-[#B0B0B0]">{apiDetail.summary}</p>
              {apiDetail.officialUrl && (
                <a
                  href={apiDetail.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 text-lg font-medium hover:underline mt-2"
                >
                  공식 사이트
                </a>
              )}
            </div>
            {/* API 로고 */}
            <div className="w-72 h-72 rounded-[60px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-[1px_5px_10px_0px_var(--tw-shadow-color)] shadow-brand-500/25 border border-brand-500/25 mt-10 md:mt-0">
              {apiDetail.logo ? (
                <img
                  src={apiDetail.logo}
                  alt={apiDetail.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-brand-500 font-semibold text-6xl">
                  {apiDetail.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 하트 및 공유 / 하단 메뉴 */}
        <div className="m-2">
          <div className="flex gap-4 mb-10">
            <img
              src={isFavorited ? HeartFill : HeartLine}
              alt="찜"
              className="w-8 h-8 cursor-pointer"
              onClick={handleToggleFavorite}
            />
            <img src={Share} alt="공유" />
          </div>

          {/* 메뉴 탭 */}
          <div>
            <div className="flex gap-6 font-sans font-medium pb-6">
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
            <div>
              {activeMenu === 'A' && (
                <OverviewSection
                  longDescription={apiDetail.longDescription}
                  categories={apiDetail.categories}
                />
              )}
              {activeMenu === 'B' && <PricingSection />}
              {activeMenu === 'C' && <ReviewSection />}
              {activeMenu === 'D' && <CodeExampleSection />}
            </div>
          </div>

          {/* API 위키 (MD Editor 적용) */}
          <div className="mt-10">
            <div className="flex justify-between items-end mb-3">
              <span className="font-sans font-medium text-2xl text-info-dark">API 위키</span>
              <span className="text-gray-500 text-sm font-sans">
                마지막 업데이트 버전: <span className="font-bold">{wikiData?.version ?? 0}</span>
              </span>
            </div>

            <div className="w-full max-w-[1112px] border border-brand-500 rounded-xl bg-white overflow-hidden p-4">
              {isEditing ? (
                /* 수정 모드: 마크다운 에디터 */
                <div data-color-mode="light">
                  <MDEditor
                    value={wikiText}
                    onChange={(val) => setWikiText(val || '')}
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
                /* 조회 모드: 마크다운 뷰어 */
                <div data-color-mode="light">
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
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 border-2 border-brand-500 text-brand-500 font-bold rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      위키 수정하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
