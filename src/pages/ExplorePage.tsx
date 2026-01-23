import APICard from "@/components/APICard"
import SearchBar from "@/components/HomePage/SearchBar"
import { useState } from "react"

interface APICardProps {
  title: string
  star: string
  usedBy: string
  price: string
  iconUrl: string
  description?: string
}

const ExplorePage = () => {
    const apies : APICardProps[]= [
        {
            title: "Google Gemini",
            star: "4.2",
            usedBy: "970M people",
            price: "Paid",
            iconUrl: "string",
            description: "구글의 최신 멀티모달 AI 모델을 활용해 텍스트, 코드, 이미지 처리 기능을 제공합니다.",
        }
    ]
    const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <div className="mt-10">
        <SearchBar
            isOpen={isSearchOpen}
            setIsOpen={setIsSearchOpen}
        />
        <div className='m-10 '>
            {apies.map((cat) => (
                <APICard
                    title={cat.title}
                    star={cat.star}
                    usedBy={cat.usedBy}
                    price={cat.price}
                    iconUrl={cat.iconUrl}
                    description={cat.description}
                />
            ))}
        </div>
    </div>
  )
}

export default ExplorePage
