import { createContext } from 'react'
import type { RequestSigninDto } from '@/types/auth'

interface AuthContextType {
  accessToken: string | null
  login: (signInData: RequestSigninDto) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
