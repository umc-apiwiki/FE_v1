import { createContext, useContext, useState, type ReactNode } from 'react'

interface BookmarkContextType {
  bookmarkedIds: number[]
  toggleBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([])

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id: number) => bookmarkedIds.includes(id)

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

// 아래 줄은 Vite HMR 규칙 경고를 무시하는 코드입니다.
// eslint-disable-next-line react-refresh/only-export-components
export function useBookmark() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider')
  }
  return context
}
