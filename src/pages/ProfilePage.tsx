import { motion } from 'framer-motion'
import profileImg from '@/assets/default_profile.png'
import editIcon from '@/assets/icons/common/ic_edit.svg'
import { useMyProfile } from '@/hooks/useUser'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'

const ProfilePage = () => {
  const { profile, isLoading, error } = useMyProfile()

  const inputBaseStyle =
    'w-64 xs:w-72 sm:w-80 h-10 xs:h-11 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 outline-none focus:border-brand-500 transition-colors pl-4 xs:pl-5 sm:pl-6 text-sm xs:text-base font-medium text-slate-900 placeholder:text-stone-300'

  // 3. 로딩/에러 처리 (안 하면 데이터 없을 때 깨질 수 있음)
  if (isLoading) return (
    <>
      <MobileHeader />
      <div className="pt-32 xs:pt-36 md:pt-40 text-center pb-20">로딩 중...</div>
      <MobileBottomNavigation />
    </>
  )
  if (error) return (
    <>
      <MobileHeader />
      <div className="pt-32 xs:pt-36 md:pt-40 text-center text-red-500 pb-20">에러 발생</div>
      <MobileBottomNavigation />
    </>
  )

  return (
    <>
      <MobileHeader />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden pt-16 xs:pt-12 md:pt-10 pb-20 xs:pb-24 px-4">
        <div className="z-10 flex flex-col items-center gap-6 xs:gap-8 md:gap-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-900 text-2xl xs:text-3xl font-medium font-['Pretendard_Variable'] tracking-widest"
        >
          Profile
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48"
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full rounded-full border border-brand-500 object-cover bg-white shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-1 xs:bottom-2 -right-8 xs:-right-10 sm:-right-12 p-1.5 xs:p-2 cursor-pointer"
          >
            <img src={editIcon} alt="Edit Profile" className="w-5 h-5 xs:w-6 xs:h-6" />
          </motion.button>
        </motion.div>

        {/* Inputs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 xs:gap-5 md:gap-6 items-center"
        >
          <div className="relative w-64 xs:w-72 sm:w-80 h-10 xs:h-11">
            {/* 4. 여기에 실제 데이터를 꽂음 */}
            <input
              type="text"
              placeholder="닉네임"
              defaultValue={profile?.nickname}
              className={inputBaseStyle}
            />
            <button
              type="button"
              className="absolute -right-[80px] xs:-right-[90px] sm:-right-[100px] top-1.5 xs:top-2 w-20 xs:w-22 sm:w-24 h-6 xs:h-7 bg-white rounded-xl xs:rounded-2xl border-[0.5px] border-brand-500 shadow-[0px_1px_2px_0px_rgba(33,150,243,0.25)] text-brand-500 text-xs xs:text-sm font-medium hover:bg-brand-50 transition-colors flex items-center justify-center pb-0.5 cursor-pointer"
            >
              중복 확인
            </button>
          </div>

          <div className="relative w-64 xs:w-72 sm:w-80 h-10 xs:h-11">
            <input type="password" placeholder="변경 비밀번호" className={inputBaseStyle} />
          </div>

          <div className="relative w-64 xs:w-72 sm:w-80 h-10 xs:h-11">
            <input type="password" placeholder="변경 비밀번호 확인" className={inputBaseStyle} />
          </div>
        </motion.div>

        {/* Delete Account */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 xs:mt-3 md:mt-4"
        >
          <button className="w-64 xs:w-72 sm:w-80 h-12 xs:h-13 sm:h-14 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 flex justify-center items-center hover:bg-slate-50 transition-colors cursor-pointer">
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
