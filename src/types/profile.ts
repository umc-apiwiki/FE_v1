import type { CommonResponse } from './common'

/**
 * 프로필 수정 요청 DTO (닉네임만 변경)
 */
export type UpdateNicknameRequest = {
  nickname: string
  password: string
  passwordConfirm: string
}

/**
 * 프로필 수정 요청 DTO (비밀번호만 변경)
 */
export type UpdatePasswordRequest = {
  nickname: string
  password: string
  passwordConfirm: string
}

/**
 * 프로필 수정 요청 DTO (공통)
 */
export type UpdateProfileRequest = {
  nickname: string
  password: string
  passwordConfirm: string
}

/**
 * 프로필 수정 응답 DTO
 */
export type UpdateProfileResponse = CommonResponse<void>

/**
 * 닉네임 중복 확인 응답 DTO
 */
export type CheckNicknameDuplicateResponse = CommonResponse<void>

/**
 * 프로필 수정 폼 데이터
 */
export type ProfileFormData = {
  nickname: string
  password: string
  passwordConfirm: string
}

/**
 * 프로필 수정 폼 에러
 */
export type ProfileFormErrors = {
  nickname?: string
  password?: string
  passwordConfirm?: string
}
