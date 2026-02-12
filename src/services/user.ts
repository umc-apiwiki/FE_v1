import * as Sentry from '@sentry/react'
import { axiosInstance } from '@/apis/axios'
import type { MyProfileResponse, MyWikiHistory, WikiHistoryParams } from '@/types/api'
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
  CheckNicknameDuplicateResponse,
} from '@/types/profile'

/**
 * 로그인한 사용자의 프로필 정보 조회
 * GET /api/v1/users/me
 */
export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const { data } = await axiosInstance.get<MyProfileResponse>('/api/v1/users/me')
  return data
}

/**
 * 사용자의 위키 편집 목록 조회
 * params를 바디가 아닌 쿼리 스트링으로 전달하도록 수정
 */
export const getMyWikiHistory = async (params: WikiHistoryParams): Promise<MyWikiHistory> => {
  const { data } = await axiosInstance.post<MyWikiHistory>('/api/v1/users/me/wikis', null, {
    params,
  })
  return data
}

/**
 * 프로필 수정 (닉네임/비밀번호)
 * PATCH /api/v1/profile
 */
export const updateProfile = async (
  profileData: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  try {
    const { data } = await axiosInstance.patch<UpdateProfileResponse>(
      '/api/v1/profile',
      profileData
    )
    return data
  } catch (error: unknown) {
    // 프로필 업데이트 실패는 중요한 기능이므로 Sentry에 보고
    Sentry.captureException(error, {
      tags: { service: 'user', action: 'updateProfile', critical: 'true' },
      extra: {
        hasNickname: !!profileData.nickname,
        hasPassword: !!profileData.password,
      },
    })
    throw error
  }
}

/**
 * 닉네임 중복 확인
 * GET /api/v1/profile/nickname/check
 */
export const checkNicknameDuplicate = async (
  nickname: string
): Promise<CheckNicknameDuplicateResponse> => {
  const { data } = await axiosInstance.get<CheckNicknameDuplicateResponse>(
    '/api/v1/profile/nickname/check',
    {
      params: { nickname },
    }
  )
  return data
}

/**
 * 회원 탈퇴
 * DELETE /api/v1/profile
 */
export const deleteUser = async (): Promise<UpdateProfileResponse> => {
  try {
    const { data } = await axiosInstance.delete<UpdateProfileResponse>('/api/v1/profile')
    return data
  } catch (error: unknown) {
    // 회원 탈퇴 실패는 중요한 기능이므로 Sentry에 보고
    Sentry.captureException(error, {
      tags: { service: 'user', action: 'deleteUser', critical: 'true' },
    })
    throw error
  }
}
