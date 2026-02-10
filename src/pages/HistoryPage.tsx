import { useState } from 'react'
import { useWikiHistory } from '@/hooks/useUser'
import type { WikiHistoryItem } from '@/types/api'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'
import ArrowLeft from '@/assets/icons/action/ic_arrow_left.svg'
import ArrowRight from '@/assets/icons/action/ic_arrow_right.svg'

const HistoryPage = () => {
  const [page, setPage] = useState(0)
  const pageSize = 16

  const { wikiHistoryList, pagination, isLoading, isError } = useWikiHistory({
    page,
    size: pageSize,
  })

  /* 전체 페이지 수 추출 (0일 경우 1로 고정) */
  const totalPage = pagination?.totalPage || 1

  /* 페이지 이동 핸들러 */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage)
    }
  }

  /* 페이지 번호 배열 생성 (예: 1, 2, 3...) */
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i)

  return (
    <>
      <MobileHeader />
      <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center overflow-hidden pt-16 xs:pt-18 md:pt-20 pb-20 xs:pb-24 px-3 xs:px-4">
        <div className="z-10 flex w-full flex-col items-center">
          <div className="mb-8 xs:mb-10 md:mb-12 text-center text-2xl xs:text-3xl font-medium tracking-widest text-info-darker font-sans">
            History
          </div>

          <div className="flex flex-col gap-3 xs:gap-4 w-full max-w-[1200px]">
            <div className="justify-start text-lg xs:text-xl font-medium text-info-dark font-sans">
              편집 내역
            </div>

            <div className="flex min-h-64 xs:min-h-80 w-full flex-col items-center rounded-[15px] xs:rounded-[20px] border border-brand-500/70 bg-white/80 py-4 xs:py-6 md:py-8 shadow-sm backdrop-blur-sm overflow-x-auto">
              <div className="mb-4 xs:mb-5 md:mb-6 grid w-full min-w-[800px] xs:min-w-[900px] md:min-w-[1000px] px-4 xs:px-6 md:px-16 lg:px-16 grid-cols-5 text-center">
                <div className="text-base xs:text-lg md:text-xl font-medium text-info-dark font-sans">
                  목록
                </div>
                <div className="text-base xs:text-lg md:text-xl font-medium text-info-dark font-sans">
                  수정일
                </div>
                <div className="text-base xs:text-lg md:text-xl font-medium text-info-dark font-sans">
                  상태
                </div>
                <div className="text-base xs:text-lg md:text-xl font-medium text-info-dark font-sans">
                  상태 변경일
                </div>
                <div className="text-base xs:text-lg md:text-xl font-medium text-info-dark font-sans">
                  사유
                </div>
              </div>

              <div className="mb-4 xs:mb-5 md:mb-6 h-0 w-[calc(100%-2rem)] xs:w-[calc(100%-3rem)] md:w-[90%] border-t border-info-dark/50" />

              <div className="flex w-full min-w-[800px] xs:min-w-[900px] md:min-w-[1000px] px-4 xs:px-6 md:px-16 lg:px-16 flex-col gap-4 xs:gap-6 md:gap-8">
                {isLoading ? (
                  <div className="py-8 xs:py-10 text-center text-info-dark text-sm xs:text-base">
                    데이터를 불러오는 중입니다...
                  </div>
                ) : isError ? (
                  <div className="py-8 xs:py-10 text-center text-red-500 text-sm xs:text-base">
                    데이터를 불러오는 데 실패했습니다.
                  </div>
                ) : wikiHistoryList.length === 0 ? (
                  <div className="py-8 xs:py-10 text-center text-zinc-400 text-sm xs:text-base">
                    편집 내역이 없습니다.
                  </div>
                ) : (
                  wikiHistoryList.map((item: WikiHistoryItem) => (
                    <div
                      key={item.requestId}
                      className="grid grid-cols-5 items-center text-center py-1"
                    >
                      <div className="truncate px-2 text-sm xs:text-base md:text-lg font-medium text-info-dark font-sans  hover:text-brand-500 cursor-pointer">
                        {item.apiName}
                      </div>
                      <div className="text-sm xs:text-base md:text-lg font-medium text-info-dark font-sans">
                        {new Date(item.editedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm xs:text-base md:text-lg font-medium text-info-dark font-sans">
                        -
                      </div>
                      <div className="text-sm xs:text-base md:text-lg font-medium text-info-dark font-sans">
                        -
                      </div>
                      <div className="text-sm xs:text-base md:text-lg font-medium text-info-dark font-sans">
                        -
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 페이지네이션 컨트롤 */}
              {!isLoading && !isError && wikiHistoryList.length > 0 && (
                <div className="mt-6 xs:mt-7 md:mt-8 flex gap-2 xs:gap-3 items-center">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="rounded px-2 xs:px-3 py-1.5 text-info-dark transition-colors hover:bg-brand-100 disabled:opacity-30 disabled:cursor-not-allowed text-sm xs:text-base"
                  >
                    <img src={ArrowLeft} alt="이전" className="w-4 h-4 mt-1" />
                  </button>

                  <div className="flex gap-1">
                    {pageNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`min-w-[28px] xs:min-w-[32px] h-[28px] xs:h-[32px] rounded text-sm xs:text-base transition-colors ${
                          page === num
                            ? 'bg-brand-500 text-white font-bold'
                            : 'text-info-dark hover:bg-brand-100'
                        }`}
                      >
                        {num + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPage - 1}
                    className="rounded px-2 xs:px-3 py-1.5 text-info-dark transition-colors hover:bg-brand-100 disabled:opacity-30 disabled:cursor-not-allowed text-sm xs:text-base"
                  >
                    <img src={ArrowRight} alt="다음" className="w-4 h-4 mt-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNavigation />
    </>
  )
}

export default HistoryPage
