/**
 * 모바일 전용 API 서비스
 */

import axios from '../apis/axios'
import type { ApiPreview, PageResponse, ApiResponse } from '../types/api'

/**
 * 인기 API 조회 (조회수 순)
 */
export const getPopularApis = async (limit = 4): Promise<ApiPreview[]> => {
  const { data } = await axios.get<ApiResponse<PageResponse<ApiPreview>>>('/api/v1/apis', {
    params: {
      page: 0,
      size: limit,
      sort: 'POPULAR',
      direction: 'DESC',
    },
  })
  return data.result?.content || []
}

/**
 * 추천 API 조회 (최신 등록순)
 */
export const getSuggestedApis = async (limit = 4): Promise<ApiPreview[]> => {
  const { data } = await axios.get<ApiResponse<PageResponse<ApiPreview>>>('/api/v1/apis', {
    params: {
      page: 0,
      size: limit,
      sort: 'LATEST',
      direction: 'DESC',
    },
  })
  return data.result?.content || []
}

/**
 * 카테고리 목록 조회
 * TODO: 백엔드에 카테고리 목록 API가 없어서 임시로 하드코딩
 * 추후 API 추가 시 실제 API 호출로 변경 필요
 */
export const getCategories = async (): Promise<string[]> => {
  // 임시 카테고리 목록
  return [
    '결제',
    '관리',
    '파일',
    '마케팅',
    '지도',
    '이미지',
    '비디오',
    'SMS',
    'AI',
    '분석',
    '프로젝트',
  ]
}

/**
 * API 검색 자동완성
 */
export const searchApiSuggestions = async (query: string, limit = 5): Promise<string[]> => {
  if (!query || query.trim().length < 1) return []

  const { data } = await axios.get<ApiResponse<PageResponse<ApiPreview>>>('/api/v1/apis', {
    params: {
      q: query,
      page: 0,
      size: limit,
    },
  })

  return data.result?.content.map((api: ApiPreview) => api.name) || []
}
