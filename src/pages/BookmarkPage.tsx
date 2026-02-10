import APICard from '@/components/APICard'
import { MobileAPICard } from '@/components/mobile/MobileAPICard'
import BookmarkCarousel from '@/components/BookmarkCarousel'
import { useBookmark } from '@/hooks/useBookmark'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { formatDate } from '@/utils/formatDate'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'

/**
 * BookmarkPage
 * 사용자가 북마크(좋아요)한 API 목록을 날짜별로 표시합니다.
 */
const BookmarkPage = () => {
  const { groupedByDate, isLoading, error, toggleBookmark, isToggling } = useBookmark()
  const { isMobile } = useDeviceDetect()

  // 로딩 상태
  if (isLoading) {
    return (
      <>
        <MobileHeader />
        <div className="w-full min-h-screen pb-32 xs:pb-40 overflow-x-hidden mt-14 xs:mt-16 md:mt-10">
          <div className="flex flex-col w-full max-w-[1440px] mx-auto px-3 xs:px-4">
            <div className="w-full flex justify-center mb-8 xs:mb-10 md:mb-12 lg:mb-16">
              <div className="text-slate-900 text-xl xs:text-2xl md:text-3xl font-medium tracking-widest">
                Archive
              </div>
            </div>
            <div className="flex items-center justify-center mt-12 xs:mt-16 md:mt-20">
              <div className="animate-spin rounded-full h-8 w-8 xs:h-10 xs:w-10 md:h-12 md:w-12 border-b-2 border-slate-900"></div>
            </div>
          </div>
        </div>
        <MobileBottomNavigation />
      </>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <>
        <MobileHeader />
        <div className="w-full min-h-screen pb-32 xs:pb-40 overflow-x-hidden mt-14 xs:mt-16 md:mt-10">
          <div className="flex flex-col w-full max-w-[1440px] mx-auto px-3 xs:px-4">
            <div className="w-full flex justify-center mb-8 xs:mb-10 md:mb-12 lg:mb-16">
              <div className="text-slate-900 text-xl xs:text-2xl md:text-3xl font-medium tracking-widest">
                Archive
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-12 xs:mt-16 md:mt-20 text-red-500">
              <p className="text-base xs:text-lg md:text-xl">오류가 발생했습니다</p>
              <p className="text-xs xs:text-sm md:text-base mt-2">{error}</p>
            </div>
          </div>
        </div>
        <MobileBottomNavigation />
      </>
    )
  }

  return (
    <>
      <MobileHeader />
      <div className="w-full min-h-screen pb-32 xs:pb-40 overflow-x-hidden mt-14 xs:mt-16 md:mt-10">
        <div className="flex flex-col w-full max-w-[1444px] mx-auto">
          <div className="w-full flex justify-center mb-8 xs:mb-10 md:mb-12 lg:mb-16">
            <div className="text-slate-900 text-xl xs:text-2xl md:text-3xl font-medium tracking-widest">
              Archive
            </div>
          </div>

          {groupedByDate.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 xs:mt-16 md:mt-20 text-gray-400 px-4">
              <p className="text-base xs:text-lg md:text-xl">아직 쳜한 API가 없습니다.</p>
              <p className="text-xs xs:text-sm md:text-base mt-2">
                Explore 페이지에서 하트를 눌러보세요!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 xs:gap-8 md:gap-10 px-3 xs:px-4 sm:px-6 md:px-10 lg:px-20">
              {groupedByDate.map((group) => (
                <BookmarkCarousel key={group.date} date={formatDate(group.date)}>
                  {isMobile ? (
                    <div className="flex gap-3 xs:gap-4">
                      {group.activities.map((api) => (
                        <MobileAPICard key={api.apiId} api={api} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-3 xs:gap-4 md:gap-5">
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
                  )}
                </BookmarkCarousel>
              ))}
            </div>
          )}
        </div>
      </div>
      <MobileBottomNavigation />
    </>
  )
}

export default BookmarkPage
