/**
 * useDeviceDetect Hook
 * 디바이스 타입 감지 및 화면 크기 추적
 * 로직과 뷰 분리 원칙에 따라 디바이스 관련 로직을 Hook으로 분리
 */

import { useState, useEffect } from 'react'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

type DeviceDetectResult = {
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  windowWidth: number
  windowHeight: number
}

/**
 * 모바일 디바이스 감지 (User Agent 기반)
 */
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 화면 크기 기반 디바이스 타입 감지
 * Tailwind breakpoints와 일치:
 * - mobile: < 768px
 * - tablet: 768px ~ 1024px
 * - desktop: >= 1024px
 */
const getDeviceType = (width: number): DeviceType => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * 디바이스 타입과 화면 크기를 추적하는 Hook
 *
 * @returns 디바이스 정보 객체
 *
 * @example
 * ```tsx
 * const { isMobile, isDesktop, windowWidth } = useDeviceDetect()
 *
 * if (isMobile) {
 *   return <MobileView />
 * }
 *
 * return <DesktopView />
 * ```
 */
export const useDeviceDetect = (): DeviceDetectResult => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    // 화면 크기 변경 감지
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    // 리스너 등록
    window.addEventListener('resize', handleResize)

    // 초기 크기 설정
    handleResize()

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 디바이스 타입 계산
  const deviceType = getDeviceType(windowWidth)

  // User Agent 기반 모바일 감지와 화면 크기 기반 감지를 조합
  const isMobileUA = isMobileDevice()
  const isMobileScreen = deviceType === 'mobile'
  const isMobile = isMobileUA || isMobileScreen

  return {
    deviceType,
    isMobile,
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    windowWidth,
    windowHeight,
  }
}
