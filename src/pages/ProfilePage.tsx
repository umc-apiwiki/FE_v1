import { motion } from 'framer-motion'
import profileImg from '@/assets/default_profile.png'
import editIcon from '@/assets/icons/common/ic_edit.svg'
import { useMyProfile } from '@/hooks/useUser'
import { useAuth } from '@/hooks/useAuth'
import { useNicknameUpdate } from '@/hooks/useNicknameUpdate'
import { usePasswordUpdate } from '@/hooks/usePasswordUpdate'
import { useDeleteAccount } from '@/hooks/useDeleteAccount'
import { MobileHeader } from '@/components/mobile/MobileHeader'
import { MobileBottomNavigation } from '@/components/mobile/MobileBottomNavigation'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { profile, isLoading, error, fetchProfile } = useMyProfile()
  const { logout } = useAuth()

  // 닉네임 변경
  const {
    nickname,
    currentPassword,
    nicknameError,
    passwordError: nicknamePasswordError,
    isSubmitting: isNicknameSubmitting,
    isNicknameChecked,
    isCheckingNickname,
    handleNicknameChange,
    handleCurrentPasswordChange,
    handleCheckNickname,
    handleSubmit: handleNicknameSubmit,
  } = useNicknameUpdate(profile?.nickname || '', () => {
    fetchProfile()
  })

  // 비밀번호 변경
  const {
    password,
    passwordConfirm,
    passwordError,
    passwordConfirmError,
    isSubmitting: isPasswordSubmitting,
    isPasswordValid,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit: handlePasswordSubmit,
  } = usePasswordUpdate(profile?.nickname || '')

  // 회원 탈퇴
  const {
    confirmText,
    isDeleting,
    isConfirmValid,
    handleConfirmTextChange,
    handleSubmit: handleDeleteSubmit,
  } = useDeleteAccount(() => {
    logout()
    navigate('/')
  })

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await logout()
    }
  }

  const inputBaseStyle =
    'w-full h-11 xs:h-12 bg-white rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] border outline-none focus:border-brand-500 transition-colors px-4 xs:px-5 sm:px-6 text-sm xs:text-base font-medium text-slate-900 placeholder:text-stone-300'

  const inputErrorStyle = 'border-red-500'
  const inputSuccessStyle = 'border-green-500'

  const buttonBaseStyle =
    'h-11 xs:h-12 rounded-[30px] shadow-[0px_3px_5px_0px_rgba(33,150,243,0.25)] flex justify-center items-center transition-colors text-sm xs:text-base font-semibold'

  const buttonPrimaryStyle = 'bg-brand-500 hover:bg-brand-600 text-white cursor-pointer'
  const buttonDisabledStyle =
    'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'

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
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] relative overflow-hidden pt-20 xs:pt-16 md:pt-12 pb-24 xs:pb-28 px-4">
        <div className="z-10 flex flex-col items-center gap-5 xs:gap-6 md:gap-8 w-full max-w-[480px]">
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

          {/* 닉네임 변경 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-white rounded-2xl shadow-md p-5 xs:p-6"
          >
            <h3 className="text-base xs:text-lg font-semibold text-slate-900 mb-4">
              닉네임 변경
            </h3>
            <div className="space-y-3">
              {/* 현재 닉네임 표시 */}
              {profile?.nickname && (
                <p className="text-xs text-gray-600 ml-1">
                  현재 닉네임: <strong>{profile.nickname}</strong>
                </p>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="새 닉네임 (2~10자, 한글/영문/숫자)"
                  value={nickname}
                  onChange={(e) => handleNicknameChange(e.target.value)}
                  className={`flex-1 ${inputBaseStyle} ${
                    nicknameError
                      ? inputErrorStyle
                      : isNicknameChecked
                        ? inputSuccessStyle
                        : 'border-zinc-200'
                  }`}
                  disabled={isNicknameSubmitting}
                  aria-label="새 닉네임"
                  aria-invalid={!!nicknameError}
                  aria-describedby={nicknameError ? 'nickname-error' : isNicknameChecked ? 'nickname-success' : undefined}
                  maxLength={10}
                  name="new-nickname-field"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={handleCheckNickname}
                  disabled={isCheckingNickname || isNicknameSubmitting || !nickname.trim()}
                  className="flex-shrink-0 w-[80px] xs:w-[90px] h-11 xs:h-12 bg-white rounded-2xl border border-brand-500 text-brand-500 text-xs xs:text-sm font-medium hover:bg-brand-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={isCheckingNickname}
                >
                  {isCheckingNickname ? '확인 중...' : '중복 확인'}
                </button>
              </div>
              {nicknameError && (
                <p id="nickname-error" className="text-red-500 text-xs ml-4" role="alert">
                  {nicknameError}
                </p>
              )}
              {isNicknameChecked && !nicknameError && nickname.trim() && (
                <p id="nickname-success" className="text-green-500 text-xs ml-4" role="status">
                  ✓ 사용 가능한 닉네임입니다.
                </p>
              )}
              
              {/* 현재 비밀번호 입력 */}
              <div>
                <input
                  type="password"
                  placeholder="현재 비밀번호 확인"
                  value={currentPassword}
                  onChange={(e) => handleCurrentPasswordChange(e.target.value)}
                  className={`${inputBaseStyle} ${nicknamePasswordError ? inputErrorStyle : 'border-zinc-200'}`}
                  disabled={isNicknameSubmitting}
                  aria-label="현재 비밀번호"
                  aria-invalid={!!nicknamePasswordError}
                  aria-describedby={nicknamePasswordError ? 'current-password-error' : undefined}
                  name="verify-password-field"
                  autoComplete="off"
                />
                {nicknamePasswordError && (
                  <p id="current-password-error" className="text-red-500 text-xs mt-1 ml-4" role="alert">
                    {nicknamePasswordError}
                  </p>
                )}
              </div>
              
              <button
                type="button"
                onClick={handleNicknameSubmit}
                disabled={!isNicknameChecked || isNicknameSubmitting || !currentPassword.trim()}
                className={`w-full ${buttonBaseStyle} ${
                  isNicknameChecked && !isNicknameSubmitting && currentPassword.trim()
                    ? buttonPrimaryStyle
                    : buttonDisabledStyle
                }`}
                aria-busy={isNicknameSubmitting}
              >
                {isNicknameSubmitting ? '변경 중...' : '닉네임 변경하기'}
              </button>
            </div>
          </motion.div>

          {/* 비밀번호 변경 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white rounded-2xl shadow-md p-5 xs:p-6"
          >
            <h3 className="text-base xs:text-lg font-semibold text-slate-900 mb-4">
              비밀번호 변경
            </h3>
            <div className="space-y-3">
              {/* 비밀번호 요구사항 안내 */}
              <div className="bg-blue-50 rounded-lg p-3 mb-2">
                <p className="text-xs text-blue-700">
                  • 8자 이상 입력해주세요<br />
                  • 영문과 숫자를 포함해야 합니다
                </p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`${inputBaseStyle} ${passwordError ? inputErrorStyle : 'border-zinc-200'}`}
                  disabled={isPasswordSubmitting}
                  aria-label="새 비밀번호"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                  name="new-password-field"
                  autoComplete="new-password"
                />
                {passwordError && (
                  <p id="password-error" className="text-red-500 text-xs mt-1 ml-4" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                  className={`${inputBaseStyle} ${passwordConfirmError ? inputErrorStyle : 'border-zinc-200'}`}
                  disabled={isPasswordSubmitting}
                  aria-label="새 비밀번호 확인"
                  aria-invalid={!!passwordConfirmError}
                  aria-describedby={passwordConfirmError ? 'password-confirm-error' : undefined}
                  name="confirm-password-field"
                  autoComplete="new-password"
                />
                {passwordConfirmError && (
                  <p id="password-confirm-error" className="text-red-500 text-xs mt-1 ml-4" role="alert">
                    {passwordConfirmError}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handlePasswordSubmit}
                disabled={!isPasswordValid || isPasswordSubmitting}
                className={`w-full ${buttonBaseStyle} ${
                  isPasswordValid && !isPasswordSubmitting
                    ? buttonPrimaryStyle
                    : buttonDisabledStyle
                }`}
                aria-busy={isPasswordSubmitting}
              >
                {isPasswordSubmitting ? '변경 중...' : '비밀번호 변경하기'}
              </button>
            </div>
          </motion.div>

          {/* 로그아웃 및 회원 탈퇴 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full space-y-3"
          >
            <button
              onClick={handleLogout}
              className="w-full h-11 xs:h-12 bg-brand-500 rounded-[30px] shadow-[0px_3px_5px_0px_rgba(33,150,243,0.25)] flex justify-center items-center hover:bg-brand-600 transition-colors cursor-pointer"
            >
              <span className="text-white text-sm xs:text-base font-semibold">로그아웃</span>
            </button>

            {/* 회원 탈퇴 섹션 */}
            <div className="bg-red-50 rounded-2xl p-4 xs:p-5 space-y-3">
              <p className="text-xs xs:text-sm text-red-600 font-medium">
                회원 탈퇴를 원하시면 아래에 <strong>"탈퇴하겠습니다"</strong>를 입력해주세요.
              </p>
              <input
                type="text"
                placeholder="탈퇴하겠습니다"
                value={confirmText}
                onChange={(e) => handleConfirmTextChange(e.target.value)}
                className={`${inputBaseStyle} ${isConfirmValid ? inputSuccessStyle : 'border-zinc-200'}`}
                disabled={isDeleting}
                autoComplete="off"
              />
              <button
                onClick={handleDeleteSubmit}
                disabled={!isConfirmValid || isDeleting}
                className={`w-full h-11 xs:h-12 rounded-[30px] shadow-[0px_3px_5px_0px_rgba(224,224,233,0.25)] flex justify-center items-center transition-colors text-sm xs:text-base font-semibold ${
                  isConfirmValid && !isDeleting
                    ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                }`}
              >
                {isDeleting ? '탈퇴 중...' : '회원 탈퇴'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <MobileBottomNavigation />
    </>
  )
}

export default ProfilePage
