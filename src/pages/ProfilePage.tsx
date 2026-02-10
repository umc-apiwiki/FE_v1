import { motion } from 'framer-motion'
import profileImg from '@/assets/default_profile.png'
import editIcon from '@/assets/icons/common/ic_edit.svg'
import { useMyProfile } from '@/hooks/useUser'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'

const ProfilePage = () => {
  const { profile, isLoading, error } = useMyProfile()

  const inputBaseStyle =
    'w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] h-11 xs:h-12 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 outline-none focus:border-brand-500 transition-colors px-4 xs:px-5 sm:px-6 text-sm xs:text-base font-medium text-slate-900 placeholder:text-stone-300'

  // 3. 로딩/에러 처리 (안 하면 데이터 없을 때 깨질 수 있음)
  if (isLoading)
    return (
      <>
        <MobileHeader />
        <div className="pt-24 xs:pt-28 md:pt-32 text-center pb-20 text-sm xs:text-base">
          로딩 중...
        </div>
        <MobileBottomNavigation />
      </>
    )
  if (error)
    return (
      <>
        <MobileHeader />
        <div className="pt-24 xs:pt-28 md:pt-32 text-center text-red-500 pb-20 text-sm xs:text-base">
          에러 발생
        </div>
        <MobileBottomNavigation />
      </>
    )

  return (
    <>
      <MobileHeader />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden pt-20 xs:pt-16 md:pt-12 pb-24 xs:pb-28 px-4">
        <div className="z-10 flex flex-col items-center gap-5 xs:gap-6 md:gap-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-900 text-xl xs:text-2xl md:text-3xl font-medium font-['Pretendard_Variable'] tracking-widest"
          >
            Profile
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-28 h-28 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full rounded-full border border-brand-500 object-cover bg-white shadow-sm"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 xs:bottom-1 -right-6 xs:-right-8 sm:-right-10 p-1.5 xs:p-2 cursor-pointer"
            >
              <img
                src={editIcon}
                alt="Edit Profile"
                className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7"
              />
            </motion.button>
          </motion.div>

          {/* Inputs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-3 xs:gap-4 md:gap-5 items-center w-full px-2"
          >
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] flex items-center gap-2">
              {/* 4. 여기에 실제 데이터를 꽂음 */}
              <input
                type="text"
                placeholder="닉네임"
                defaultValue={profile?.nickname}
                className={inputBaseStyle}
              />
              <button
                type="button"
                className="flex-shrink-0 w-[70px] xs:w-[80px] sm:w-[90px] h-8 xs:h-9 bg-white rounded-xl xs:rounded-2xl border-[0.5px] border-brand-500 shadow-[0px_1px_2px_0px_rgba(33,150,243,0.25)] text-brand-500 text-[11px] xs:text-xs sm:text-sm font-medium hover:bg-brand-50 transition-colors flex items-center justify-center cursor-pointer"
              >
                중복 확인
              </button>
            </div>

            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px]">
              <input type="password" placeholder="변경 비밀번호" className={inputBaseStyle} />
            </div>

            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px]">
              <input type="password" placeholder="변경 비밀번호 확인" className={inputBaseStyle} />
            </div>
          </motion.div>

          {/* Delete Account */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 xs:mt-4 md:mt-5 w-full px-2"
          >
            <button className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] h-11 xs:h-12 sm:h-13 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 flex justify-center items-center hover:bg-slate-50 transition-colors cursor-pointer mx-auto">
              <span className="text-zinc-400 text-sm xs:text-base font-normal">회원 탈퇴</span>
            </button>
          </motion.div>
        </div>
      </div>
      <MobileBottomNavigation />
    </>
  )
}

export default ProfilePage
