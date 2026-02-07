import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthProvider로 감싸지지 않았습니다')
  }
  return context
}
