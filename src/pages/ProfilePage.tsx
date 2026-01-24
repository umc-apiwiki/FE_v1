import { motion } from 'framer-motion'
import profileImg from '@/assets/default_profile.png'
import editIcon from '@/assets/icons/common/ic_edit.svg'

const ProfilePage = () => {
  const inputBaseStyle =
    'w-80 h-11 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 outline-none focus:border-brand-500 transition-colors pl-6 text-base font-medium text-slate-900 placeholder:text-stone-300'

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden pt-10 pb-20">
      {/* [수정됨] 배경 위치 조정 
        top-1/2 -> top-[40%] (홈페이지와 동일한 높이감)
        -translate-y-1/2 제거 (top 기준 위치 사용)
      */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-500/50 rounded-full blur-[200px] pointer-events-none" />

      {/* 컨텐츠 영역 */}
      <div className="z-10 flex flex-col items-center gap-10">
        {/* 1. Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-900 text-3xl font-medium font-['Pretendard_Variable'] tracking-widest"
        >
          Profile
        </motion.div>

        {/* 2. Profile Image & Icon Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-48 h-48"
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full rounded-full border border-brand-500 object-cover bg-white shadow-sm"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 -right-12 p-2 cursor-pointer"
          >
            <img src={editIcon} alt="Edit Profile" className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* 3. Inputs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6 items-center"
        >
          <div className="relative w-80 h-11">
            <input type="text" placeholder="닉네임" className={inputBaseStyle} />
            <button
              type="button"
              className="absolute -right-[100px] top-2 w-24 h-7 bg-white rounded-2xl border-[0.5px] border-brand-500 shadow-[0px_1px_2px_0px_rgba(33,150,243,0.25)] text-brand-500 text-sm font-medium hover:bg-brand-50 transition-colors flex items-center justify-center pb-0.5 cursor-pointer"
            >
              중복 확인
            </button>
          </div>

          <div className="relative w-80 h-11">
            <input type="password" placeholder="변경 비밀번호" className={inputBaseStyle} />
          </div>

          <div className="relative w-80 h-11">
            <input type="password" placeholder="변경 비밀번호 확인" className={inputBaseStyle} />
          </div>
        </motion.div>

        {/* 4. Delete Account Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <button className="w-80 h-14 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border border-zinc-200 flex justify-center items-center hover:bg-slate-50 transition-colors cursor-pointer">
            <span className="text-zinc-400 text-base font-normal">회원 탈퇴</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
