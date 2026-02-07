import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSignupDto,
} from '@/types/auth'
import { axiosInstance } from './axios'
import type { CommonResponse } from '@/types/common'

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post('/api/v1/auth/signup', body)
  return data
}

export const postSignin = async (body: RequestSigninDto) => {
  const { data } = await axiosInstance.post('/api/v1/auth/login', body)
  return data
}

// 로그아웃 요청함
export const postLogout = async (): Promise<CommonResponse<string>> => {
  const { data } = await axiosInstance.post('/api/v1/auth/logout')
  return data
}

// 내 정보 조회함
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get('/api/v1/users/me')
  return data
}
