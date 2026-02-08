import APICard from '@/components/APICard'
import BookmarkCarousel from '@/components/BookmarkCarousel'
import { useBookmark } from '@/hooks/useBookmark'
import { formatDate } from '@/utils/formatDate'

/**
 * BookmarkPage
 * 사용자가 북마크(좋아요)한 API 목록을 날짜별로 표시합니다.
 */
const BookmarkPage = () => {
  const { groupedByDate, isLoading, error, toggleBookmark, isToggling } = useBookmark()

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto">
          <div className="w-full flex justify-center mb-16">
            <div className="text-slate-900 text-3xl font-medium tracking-widest">Archive</div>
          </div>
          <div className="flex items-center justify-center mt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto">
          <div className="w-full flex justify-center mb-16">
            <div className="text-slate-900 text-3xl font-medium tracking-widest">Archive</div>
          </div>
          <div className="flex flex-col items-center justify-center mt-20 text-red-500">
            <p className="text-xl">오류가 발생했습니다</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
      <div className="flex flex-col w-full max-w-[1444px] mx-auto">
        <div className="w-full flex justify-center mb-16">
          <div className="text-slate-900 text-3xl font-medium tracking-widest">Archive</div>
        </div>

        {groupedByDate.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-xl">아직 찜한 API가 없습니다.</p>
            <p className="text-sm mt-2">Explore 페이지에서 하트를 눌러보세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-20">
            {groupedByDate.map((group) => (
              <BookmarkCarousel key={group.date} date={formatDate(group.date)}>
                <div className="flex gap-5">
                  {group.activities.map((api) => (
                    <APICard
                      key={api.apiId}
                      {...api}
                      isFavorited={api.isFavorited}
                      onToggleFavorite={async () => {
                        if (!isToggling) {
                          api.isFavorited = !api.isFavorited
                          await toggleBookmark(api.apiId)
                        }
                      }}
                    />
                  ))}
                </div>
              </BookmarkCarousel>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookmarkPage
