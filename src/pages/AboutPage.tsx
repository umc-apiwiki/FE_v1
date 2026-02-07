import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden z-10">
        <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-[4rem] md:text-[5.5rem] font-bold mb-8 text-brand-500 leading-tight tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2,
            }}
          >
            API WIKI
          </motion.h1>

          <motion.p
            className="text-[1.8rem] md:text-[2.2rem] mb-10 text-slate-800 font-medium"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            개발자들이 함께 만드는 API 선택 가이드
          </motion.p>

          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-slate-500"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            최고의 API를 찾고, 비교하고, 공유하세요.
            <br />
            우리는 개발자들의 더 나은 선택을 위해 존재합니다.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section (애니메이션, 테두리 유지) */}
      <section className="relative py-24 container mx-auto px-4 z-10">
        <div>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-[2.5rem] font-bold mb-6 text-brand-500"
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              우리의 미션
            </motion.h2>
            <motion.div
              className="w-16 h-1.5 mx-auto bg-brand-500 rounded-full opacity-80"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1 - Discovery */}
            <motion.div
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-full"
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-sm h-full flex flex-col items-start border border-brand-500"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: '0 20px 60px rgba(33, 150, 243, 0.3)',
                  borderColor: '#2196F3',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-14 h-14 mb-6 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">발견</h3>
                <p className="text-[15px] leading-relaxed text-slate-500 text-left">
                  수천 개의 API 중에서 프로젝트에 완벽하게 맞는 API를 쉽게 찾아보세요. 카테고리별
                  검색과 필터링으로 빠른 탐색이 가능합니다.
                </p>
              </motion.div>
            </motion.div>

            {/* Card 2 - Compare */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full"
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-sm h-full flex flex-col items-start border border-brand-500"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 5,
                  boxShadow: '0 20px 60px rgba(33, 150, 243, 0.3)',
                  borderColor: '#2196F3',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-14 h-14 mb-6 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">비교</h3>
                <p className="text-[15px] leading-relaxed text-slate-500 text-left">
                  가격, 기능, 성능을 한눈에 비교하세요. 최대 4개의 API를 동시에 비교하여 최선의
                  선택을 할 수 있습니다.
                </p>
              </motion.div>
            </motion.div>

            {/* Card 3 - Share */}
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full"
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-sm h-full flex flex-col items-start border border-brand-500"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  boxShadow: '0 20px 60px rgba(33, 150, 243, 0.3)',
                  borderColor: '#2196F3',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-14 h-14 mb-6 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">공유</h3>
                <p className="text-[15px] leading-relaxed text-slate-500 text-left">
                  실제 사용 경험을 공유하고 커뮤니티와 함께 성장하세요. 리뷰와 평가로 더 나은 API
                  생태계를 만들어갑니다.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section (베타 버전 사이즈 참조하여 수정됨) */}
      <section className="relative py-24 container mx-auto px-4 z-10">
        <div>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[2.5rem] font-bold mb-6 text-brand-500">핵심 가치</h2>
            <motion.div
              className="w-16 h-1.5 mx-auto bg-brand-500 rounded-full opacity-80"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Transparency */}
            <motion.div
              // [수정] p-10 적용하여 카드 크기 확대 (베타버전 참조)
              className="bg-white p-10 rounded-3xl shadow-sm border border-brand-500 flex flex-col md:flex-row md:items-center gap-8"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
              }}
            >
              <div className="flex items-center gap-6 shrink-0 min-w-[200px]">
                <motion.div
                  className="w-14 h-14 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-brand-500">투명성</h3>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 text-left">
                모든 정보는 투명하게 공개됩니다. 실제 사용자들의 리뷰와 평가를 기반으로 객관적인
                정보를 제공합니다. 숨김없는 가격 정보와 실제 경험담을 확인하세요.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div
              // [수정] p-10 적용하여 카드 크기 확대
              className="bg-white p-10 rounded-3xl shadow-sm border border-brand-500 flex flex-col md:flex-row md:items-center gap-8"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
              }}
            >
              <div className="flex items-center gap-6 shrink-0 min-w-[200px]">
                <motion.div
                  className="w-14 h-14 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-brand-500">커뮤니티</h3>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 text-left">
                개발자들의, 개발자들에 의한, 개발자들을 위한 플랫폼입니다. 함께 만들고 함께 성장하는
                커뮤니티 중심의 생태계를 지향합니다.
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div
              // [수정] p-10 적용하여 카드 크기 확대
              className="bg-white p-10 rounded-3xl shadow-sm border border-brand-500 flex flex-col md:flex-row md:items-center gap-8"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 60px rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
              }}
            >
              <div className="flex items-center gap-6 shrink-0 min-w-[200px]">
                <motion.div
                  className="w-14 h-14 flex items-center justify-center bg-brand-50 rounded-2xl text-brand-500"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    default: { duration: 0.6 },
                  }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-brand-500">혁신</h3>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 text-left">
                끊임없이 개선하고 발전합니다. 최신 기술과 트렌드를 빠르게 반영하여 개발자들이 항상
                최고의 선택을 할 수 있도록 돕습니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 container mx-auto px-4 z-10">
        <div className="relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[2.5rem] font-bold mb-6 text-brand-500">함께 만드는 성과</h2>
            <motion.div
              className="w-16 h-1.5 mx-auto bg-brand-500 rounded-full opacity-80"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '30+', label: '등록된 API', delay: 0.1 },
              { value: '9', label: '카테고리', delay: 0.2 },
              { value: '100%', label: '무료 사용', delay: 0.3 },
              { value: '∞', label: '가능성', delay: 0.4 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: stat.delay,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <motion.div
                  className="text-center p-8 bg-white rounded-3xl shadow-sm h-full flex flex-col justify-center items-center border border-brand-500"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 25px 50px rgba(33, 150, 243, 0.3)',
                    borderColor: '#2196F3',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold mb-3 text-brand-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: stat.delay + 0.2 },
                      y: { duration: 0.6, delay: stat.delay + 0.2 },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      },
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-base text-slate-500 font-medium">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 container mx-auto px-4 z-10">
        <div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="bg-white p-12 md:p-16 rounded-3xl shadow-lg max-w-4xl mx-auto relative overflow-hidden border border-brand-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  background: 'linear-gradient(45deg, #2196F3, transparent, #2196F3)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.h2
                className="text-[2rem] md:text-[2.5rem] font-bold mb-6 relative z-10 text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                지금 바로 시작하세요
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl mb-12 leading-relaxed relative z-10 text-slate-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                완벽한 API를 찾고 프로젝트를 성공으로 이끌어보세요.
                <br />
                API WIKI와 함께라면 더 빠르고 정확한 선택이 가능합니다.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/explore"
                    className="px-8 py-4 text-white font-semibold text-lg inline-block bg-brand-500 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow"
                  >
                    API 탐색하기
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/"
                    className="px-8 py-4 font-semibold text-lg border-2 inline-block text-brand-500 border-brand-500 rounded-full hover:bg-brand-50 transition-colors"
                  >
                    홈으로 돌아가기
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
