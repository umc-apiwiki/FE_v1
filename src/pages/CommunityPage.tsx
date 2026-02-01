const CommunityPage = () => {
  return (
    <div className="w-full min-h-screen pb-40 overflow-x-hidden mt-10">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto">
        {/* 페이지 제목 (BookmarkPage와 동일한 스타일) */}
        <div className="w-full flex justify-center mb-16">
          <div className="text-slate-900 text-3xl font-medium font-['Pretendard_Variable'] tracking-widest">
            Community
          </div>
        </div>

        {/* 임시 콘텐츠 영역 */}
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-4">
          {/* 아이콘이나 이미지가 있다면 여기에 추가 가능 */}
          <div className="text-6xl">🚧</div>
          <p className="text-xl font-medium">커뮤니티 페이지 준비 중입니다.</p>
          <p className="text-sm">개발자들이 소통할 수 있는 공간을 만들고 있어요!</p>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
