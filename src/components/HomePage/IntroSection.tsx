import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'

export default function IntroSection() {
  return (
    <div className="flex flex-col items-center z-10">
      <div className="flex flex-col items-center">
        <img src={BrandLogo} alt="API Wiki 로고" />
        <h1 className="font-mono font-medium text-[70px] text-info-dark tracking-[-3px]">
          API Wiki
        </h1>
      </div>
      <span className="font-sans font-medium text-2xl text-brand-900">
        개발자가 함께 만드는 API 지식, 실시간으로 업데이트됩니다
      </span>
    </div>
  )
}
