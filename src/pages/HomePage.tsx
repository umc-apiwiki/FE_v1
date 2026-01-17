import BrandLogo from '@/assets/icons/common/ic_brand_logo.svg'
import SearchLine from '@/assets/icons/action/ic_search_line.svg'
import ChevronUp from '@/assets/icons/action/ic_chevron_up.svg'
import CategoryTag from '@/components/CategoryTag';
import ArrowLeft from '@/assets/icons/action/ic_arrow_left.svg'
import ArrowRight from '@/assets/icons/action/ic_arrow_right.svg'
import { useRef, useState } from 'react';

const HomePage = () => {
    const categories = [
        { id: 1, name: "결제" },
        { id: 2, name: "소셜로그인" },
        { id: 3, name: "지도" },
        { id: 4, name: "날씨" },
        { id: 5, name: "AI" },
        { id: 6, name: "이메일" },
        { id: 7, name: "금융" },
        { id: 8, name: "데이터" },
        { id: 9, name: "보안" },
        { id: 10, name: "통신" },
        { id: 11, name: "미디어" },
        { id: 12, name: "개발도구" },
        { id: 13, name: "클라우드" },
        { id: 14, name: "CMS" },
        { id: 15, name: "분석" },
        { id: 16, name: "모니터링" },
    ];
    const tagScrollRef = useRef<HTMLDivElement | null>(null);
    const [indicatorX, setIndicatorX] = useState(0);

    const SCROLL_AMOUNT = 200;

    const handlePrev = () => {
        tagScrollRef.current?.scrollBy({
            left: -SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    const handleNext = () => {
        tagScrollRef.current?.scrollBy({
            left: SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const el = tagScrollRef.current;
        if (!el) return;

        const scrollableWidth = el.scrollWidth - el.clientWidth;
        const progress = el.scrollLeft / scrollableWidth;

        const maxMove = 24; // 회색 바(20) - 초록 바(14) = 6
        setIndicatorX(progress * maxMove);
    };

    return (
        // 홈화면
        <div className='flex flex-col items-center justify-center'>
            <div className='relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-8'>
                {/* 배경 원 */}
                <div className="absolute w-[300px] h-[300px] bg-brand-500/50 rounded-full blur-[200px]"/>

                {/* 로고와 소개글*/}
                <div className='flex flex-col items-center z-10'>
                    <div className='flex flex-col items-center'>
                        <img src={BrandLogo} />
                        <h1 className='font-mono font font-medium text-[70px] text-brand-800 tracking-[-3px]'>API Wiki</h1>
                    </div>
                    <span className='font-sans font-medium text-2xl text-brand-900'>개발자가 함께 만드는 API 지식, 실시간으로 업데이트됩니다</span>
                </div>

                {/* 검색창*/}
                <div className='flex items-center bg-white border shadow-[1px_1px_5px_2px_var(--tw-shadow-color)] shadow-brand-500/25 border-brand-500/25 rounded-3xl w-[876px] h-[60px] px-6 z-10'>
                    <input type="text" className='flex-1 h-full outline-none text-lg'/>
                    <button type='button'>
                        <img src={SearchLine} />
                    </button>
                </div>

                {/* 태그 컴포넌트*/}
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex z-10 gap-3'>
                        <button type='button'
                            onClick={handlePrev}>
                            <img src={ArrowLeft}/>
                        </button>
                        <div
                            ref={tagScrollRef}
                            onScroll={handleScroll}
                            className='flex gap-3 overflow-x-hidden  w-[600px] whitespace-nowrap py-1'
                        >
                            {categories.map((cat) => (
                                <CategoryTag
                                    key={cat.id}
                                    category={cat}
                                />
                            ))}
                        </div>
                        <button type='button'
                            onClick={handleNext}>
                            <img src={ArrowRight} />
                        </button>
                    </div>

                    {/* 라인*/}
                    <div className='relative w-20 mt-1'>
                        <div className='absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl'/>
                        <div className='absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl z-15 transition-transform duration-200'
                        style={{ transform: `translateX(${indicatorX}px)` }}/>
                    </div>
                </div>
            </div>

            {/* 하단 버튼*/}
            <button type='button' className='fixed bottom-3 hover:-translate-y-1 transition-all duration-200'>
                <img src={ChevronUp} />
            </button>
        </div>

    );
};

export default HomePage;