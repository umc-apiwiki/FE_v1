export default function SearchBar() {
  // 4개의 검색어 리스트
  const searchTerms = [
    'AWS API',
    '네이버지도 API',
    '강아지 앱 API',
    '게임 앱 API',
  ];

  return (
    <div className="w-full max-w-2xl relative group">
      <div className="relative z-20">
        <input
          type="text"
          className="w-full h-14 px-14 rounded-full border border-gray-100 shadow-md outline-none focus:ring-2 focus:ring-sky-300 transition-all"
          placeholder="AWS API"
        />
        <span className="absolute left-6 top-1/2 -translate-y-1/2">🕒</span>
      </div>

      {/* 마우스 올렸을 때 나타나는 자동완성 박스 */}
      <div className="absolute top-2 left-0 w-full pt-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md border border-sky-100 rounded-2xl shadow-xl overflow-hidden py-2">
          {searchTerms.map((term, index) => (
            <div
              key={index}
              className="px-6 py-4 flex items-center justify-between hover:bg-sky-500/10 cursor-pointer transition-colors group/item"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500">🕒</span>
                <span className="text-slate-900 font-medium">{term}</span>
              </div>
              {/* 제시된 디자인의 우측 삭제 아이콘 대응 */}
              <button className="text-slate-400 font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
