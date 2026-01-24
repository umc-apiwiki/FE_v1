const HistoryPage = () => {
  const historyData = [
    {
      id: 1,
      name: '구글 api',
      date: '2026.01.01',
      status: '검토중',
      changeDate: '',
      reason: '',
    },
    {
      id: 2,
      name: '카카오톡 api',
      date: '2026.12.30',
      status: '통과',
      changeDate: '2026.01.02',
      reason: '',
    },
    {
      id: 3,
      name: '유튜브 api',
      date: '2026.12.10',
      status: '거절',
      changeDate: '2026.12.11',
      reason: '비속어',
    },
  ]

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center overflow-hidden pt-20">
      {/* 배경 원 수정됨: top-[20%] -> top-[40%] (홈페이지와 시각적 높이 맞춤) */}
      <div className="absolute left-1/2 top-[40%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-brand-500/50 blur-[200px]" />

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
          <div className="flex h-80 w-[1112px] flex-col items-center rounded-[20px] border border-sky-500 bg-white/80 py-8 shadow-sm backdrop-blur-sm">
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
              {historyData.map((item) => (
                <div key={item.id} className="grid grid-cols-5 items-center text-center">
                  <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                    {item.name}
                  </div>
                  <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                    {item.date}
                  </div>
                  <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                    {item.status}
                  </div>
                  <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                    {item.changeDate || ''}
                  </div>
                  <div className="text-lg font-medium text-sky-900 font-['Pretendard_Variable']">
                    {item.reason || ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
