import Category from './Category'

export default function OverviewSection() {
  const categories = [
    { id: 1, name: '결제' },
    { id: 2, name: '소셜로그인' },
    { id: 3, name: '지도' },
    { id: 4, name: '날씨' },
  ]
  return (
    <div>
      {/* 설명 */}
      <div className="mb-6">
        <span className="text-[22px] font-medium text-info-darker ">설명</span>
        <p className="text-xl font-medium text-info-dark mt-2">
          노션 API는 노션의 데이터베이스와 페이지를 외부 프로그램이나 서비스와 연결해 주는 개발
          도구입니다. 이를 활용하면 코드를 통해 데이터를 자동으로 읽거나 쓸 수 있어, 설문지 응답을
          노션에 바로 기록하거나 일정 관리 앱과 연동하는 등의 업무 자동화가 가능해집니다. 현대적인
          REST API 방식과 JSON 데이터 형식을 따르고 있어 개발자가 다루기 편리하며, 특정 페이지에만
          접근 권한을 부여하는 보안 설정으로 데이터를 안전하게 관리할 수 있습니다. 결과적으로 노션
          API는 노션을 단순한 메모장을 넘어 하나의 거대한 데이터베이스 서버처럼 활용할 수 있게
          해줍니다.
        </p>
      </div>
      {/* 카테고리 */}
      <div className="z-10">
        <span className="text-[22px] font-medium text-info-darker">카테고리</span>

        <div className="flex gap-3 mt-3 mb-6">
          {categories.map((cat) => (
            <Category key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  )
}
