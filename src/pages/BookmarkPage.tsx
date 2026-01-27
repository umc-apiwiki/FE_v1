import APICard from '@/components/APICard'
import { apiData } from '@/data/mockData'
import { useBookmark } from '@/context/BookmarkContext'
import BookmarkCarousel from '@/components/BookmarkCarousel'

const BookmarkPage = () => {
  const { bookmarkedIds } = useBookmark()

  // 1. 찜한 데이터 필터링
  const myBookmarkedItems = apiData.filter((item) => bookmarkedIds.includes(item.id))

  // 2. 날짜별 그룹화 (현재는 2025.12.30 하나로 통일됨)
  const groupedData = myBookmarkedItems.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = []
      }
      acc[item.date].push(item)
      return acc
    },
    {} as Record<string, typeof apiData>
  )

  const sortedDates = Object.keys(groupedData)

  return (
    <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto">
        {/* Archive 제목 중앙 정렬 */}
        <div className="w-full flex justify-center mb-16">
          <div className="text-slate-900 text-3xl font-medium font-['Pretendard_Variable'] tracking-widest">
            Archive
          </div>
        </div>

        {/* 찜한 목록이 없을 때 */}
        {sortedDates.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-xl">아직 찜한 API가 없습니다.</p>
            <p className="text-sm mt-2">Explore 페이지에서 하트를 눌러보세요!</p>
          </div>
        ) : (
          // 날짜별 캐러셀 렌더링
          <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-20">
            {sortedDates.map((date) => (
              <BookmarkCarousel key={date} date={date}>
                {groupedData[date].map((item) => (
                  <APICard key={item.id} {...item} />
                ))}
              </BookmarkCarousel>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookmarkPage
