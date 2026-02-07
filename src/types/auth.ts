import type { CommonResponse } from './common'

// 회원가입
export type RequestSignupDto = {
  email: string
  password: string
  nickname: string
}

export type ResponseSignupDto = CommonResponse<{
  memberId: number
  accessToken: string
  nickname: string
}>

// 로그인
export type RequestSigninDto = {
  email: string
  password: string
}

export type ResponseSigninDto = CommonResponse<{
  memberId: number
  accessToken: string
  nickname: string
}>

export type ResponseMyInfoDto = CommonResponse<{
  nickname: string
}>
