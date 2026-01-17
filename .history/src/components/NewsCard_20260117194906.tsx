interface NewsCardProps {
  title: string;
  publisherLogoUrl: string;
  thumbnailUrl: string;
}

export default function NewsCard({
  title,
  publisherLogoUrl,
  thumbnailUrl,
}: NewsCardProps) {
  return (
    <div className="group relative w-80 h-60 flex-shrink-0 cursor-pointer">
      {/* 수정됨: border-[0.25px] border-sky-500 삭제 */}
      <div
        className="w-full h-full bg-white rounded-2xl shadow-[1px_5px_10px_0px_rgba(33,150,243,0.25)] 
        transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-sky-500/10 group-hover:to-white/20 p-2.5"
      >
        <img
          className="w-full h-36 rounded-[10px] object-cover mb-2.5"
          src={thumbnailUrl}
          alt="news"
        />
        <img
          className="h-3.5 ml-1 mb-2 object-contain"
          src={publisherLogoUrl}
          alt="publisher"
        />

        <div className="ml-1">
          <div className="text-black text-sm font-medium line-clamp-1">
            {title}
          </div>
          <div className="text-zinc-400 text-[10px] font-normal mt-1">
            자유롭게 의견을 나누어 보세요!
          </div>
        </div>
      </div>
    </div>
  );
}
