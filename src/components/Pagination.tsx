interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  /* 페이지가 1개 이하면 표시하지 않음 */
  if (totalPages <= 1) return null

  /* 표시할 페이지 번호 계산 (최대 5개) */
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      /* 전체 페이지가 5개 이하면 모두 표시 */
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      /* 5개 이상이면 현재 페이지 기준으로 계산 */
      if (currentPage <= 2) {
        /* 처음 부근 */
        for (let i = 0; i < 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages - 1)
      } else if (currentPage >= totalPages - 3) {
        /* 끝 부근 */
        pages.push(0)
        pages.push('...')
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i)
        }
      } else {
        /* 중간 */
        pages.push(0)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages - 1)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={`flex items-center justify-center gap-1 xs:gap-2 ${className}`}>
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-2 xs:px-3 py-1 xs:py-2 text-xs xs:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        ◀
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 xs:px-3 py-1 xs:py-2 text-xs xs:text-sm text-gray-500"
            >
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[32px] xs:min-w-[36px] px-2 xs:px-3 py-1 xs:py-2 text-xs xs:text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-brand-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNum + 1}
          </button>
        )
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-2 xs:px-3 py-1 xs:py-2 text-xs xs:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        ▶
      </button>
    </div>
  )
}
