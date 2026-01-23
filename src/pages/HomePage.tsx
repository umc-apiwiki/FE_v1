import SearchBar from '@/components/HomePage/SearchBar'
import IntroSection from '@/components/HomePage/IntroSection'
import SearchTagSection from '@/components/HomePage/SearchTagSection'
import BottomButtomSection from '@/components/HomePage/BottomButtonSection'
import { useState } from 'react'

const HomePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    // 홈화면
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-8">
        {/* 배경 원 */}
        <div className="absolute w-[300px] h-[300px] bg-brand-500/50 rounded-full blur-[200px]" />

        {/* 로고와 소개글*/}
        {!isSearchOpen && <IntroSection />}

        {/* 검색창*/}
        <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} isMain={true} />

        {/* 태그 컴포넌트*/}
        {!isSearchOpen && <SearchTagSection />}
      </div>

      {/* 하단 버튼*/}
      {!isSearchOpen && <BottomButtomSection />}
    </div>
  )
}

export default HomePage
