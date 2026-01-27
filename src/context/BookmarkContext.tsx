import { createContext, useContext, useState, type ReactNode } from 'react'

interface BookmarkContextType {
  bookmarkedIds: number[]
  toggleBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

// [중요] export function 이어야 다른 곳에서 import { BookmarkProvider } 가 가능합니다.
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

// [중요] export function 이어야 다른 곳에서 import { useBookmark } 가 가능합니다.
export function useBookmark() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider')
  }
  return context
}
