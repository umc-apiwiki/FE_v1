import { useWikiHistory } from '@/hooks/useWikiHistory'

const HistoryPage = () => {
  const { wikiHistoryList, isLoading, isError } = useWikiHistory({
    page: 0,
    size: 16,
  })

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
                <div className="text-center text-sky-900">데이터를 불러오는 중임...</div>
              ) : isError ? (
                <div className="text-center text-red-500">데이터를 불러오는 데 실패함.</div>
              ) : (
                wikiHistoryList.map((item) => (
                  <div key={item.requestId} className="grid grid-cols-5 items-center text-center">
                    <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
