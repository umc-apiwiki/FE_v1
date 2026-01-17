const BookmarkPage = () => {
  // return <h1>Bookmark Page</h1>;
  return (
    <button
      onClick={() => {
        throw new Error('GlitchTip test error')
      }}
    >
      Send test error
    </button>
  )
  // 에러 트레킹 테스트용 버튼 나중에 제거해 주세요!
}

export default BookmarkPage
