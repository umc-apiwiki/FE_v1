export default function CodeExampleSection() {
  const exampleCode = {
    분류: 'Python',
    코드: `  # Weather API API 사용 예제

  import requests

  API_KEY = "your_api_key_here"
  BASE_URL = "https://api.example.com/v1"

  def get_data():
      headers = {
          "Authorization": f"Bearer {API_KEY}",
          "Content-Type": "application/json"
      }
      response = requests.get(
          f"{BASE_URL}/endpoint",
          headers=headers
      )
      if response.status_code == 200:
          return response.json()
      else:
          print(f"Error: {response.status_code}")
          return None

  # 사용 예시
  data = get_data()
  print(data)`,
  }

  return (
    <div>
      {/* 빠른 시작 가이드 */}
      <div className="mb-3 xs:mb-4 md:mb-5">
        <span className="font-medium text-base xs:text-lg md:text-xl lg:text-[22px] text-info-darker">
          빠른 시작 가이드 : {exampleCode.분류}
        </span>
      </div>
      {/* 코드 박스 */}
      <div className="w-full max-w-[1112px] h-auto bg-[#111827] border border-brand-500/70 rounded-[10px] p-4 xs:p-6 md:p-8 lg:p-10 mb-6 xs:mb-8 md:mb-10 overflow-x-auto">
        {/* 코드 */}
        <div>
          <pre className="font-mono font-normal text-xs xs:text-sm md:text-base text-white">
            {exampleCode.코드}
          </pre>
        </div>
      </div>
    </div>
  )
}
