import { useState } from 'react'
import { useWikiHistory } from '@/hooks/useUser'
import type { WikiHistoryItem } from '@/types/api'

const HistoryPage = () => {
  // 1. 페이지 상태 관리 (0부터 시작)
  const [page, setPage] = useState(0)
  const pageSize = 16

  // 2. 훅 연동 (데이터 + 페이징 정보 가져오기)
  const { wikiHistoryList, pagination, isLoading, isError } = useWikiHistory({
    page,
    size: pageSize,
  })

  // 3. 전체 페이지 수 계산 (데이터 없으면 1페이지로 표시)
  const totalPage = pagination?.totalPage || 1

  // 4. 버튼 핸들러
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPage - 1) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center overflow-hidden pt-20">
      <div className="z-10 flex w-full flex-col items-center">
        {/* Title: History */}
        <div className="mb-12 text-center text-3xl font-medium tracking-widest text-slate-900 font-['Pretendard_Variable']">
          History
        </div>

        <div className="flex flex-col gap-4">
          {/* Subtitle: 편집 내역 */}
          <div className="justify-start text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
            편집 내역
          </div>

          {/* Content Card */}
          <div className="flex min-h-80 w-[1112px] flex-col items-center rounded-[20px] border border-sky-500 bg-white/80 py-8 shadow-sm backdrop-blur-sm">
            {/* Table Header */}
            <div className="mb-6 grid w-[1000px] grid-cols-5 text-center">
              <div className="text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
                목록
              </div>
              <div className="text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
                수정일
              </div>
              <div className="text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
                상태
              </div>
              <div className="text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
                상태 변경일
              </div>
              <div className="text-xl font-medium text-sky-900 font-['Pretendard_Variable']">
                사유
              </div>
            </div>

            {/* 구분선 */}
            <div className="mb-6 h-0 w-[1000px] outline outline-1 outline-offset-[-0.50px] outline-sky-900/50"></div>

            {/* Table Body */}
            <div className="flex w-[1000px] flex-col gap-8">
              {isLoading ? (
                <div className="py-10 text-center text-sky-900">데이터를 불러오는 중입니다...</div>
              ) : isError ? (
                <div className="py-10 text-center text-red-500">
                  데이터를 불러오는 데 실패했습니다.
                </div>
              ) : wikiHistoryList.length === 0 ? (
                <div className="py-10 text-center text-zinc-400">편집 내역이 없습니다.</div>
              ) : (
                wikiHistoryList.map((item: WikiHistoryItem) => (
                  <div
                    key={item.requestId}
                    className="grid grid-cols-5 items-center text-center rounded-lg py-1 hover:bg-sky-50/50 transition-colors"
                  >
                    <div className="truncate px-2 text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                      {item.apiName}
                    </div>
                    <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                      {new Date(item.editedAt).toLocaleDateString()}
                    </div>
                    <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                      -
                    </div>
                    <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                      -
                    </div>
                    <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                      -
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 5. 페이지네이션 컨트롤 (버튼 추가됨) */}
            {!isLoading && !isError && wikiHistoryList.length > 0 && (
              <div className="mt-8 flex gap-4 items-center">
                <button
                  onClick={handlePrevPage}
                  className="rounded px-4 py-2 text-sky-900 transition-colors hover:bg-sky-100 cursor-pointer"
                >
                  &lt; 이전
                </button>
                <span className="flex items-center text-sky-900">
                  {page + 1} / {totalPage}
                </span>
                <button
                  onClick={handleNextPage}
                  className="rounded px-4 py-2 text-sky-900 transition-colors hover:bg-sky-100 cursor-pointer"
                >
                  다음 &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
