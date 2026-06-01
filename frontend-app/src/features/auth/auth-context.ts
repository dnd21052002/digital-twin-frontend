import { createContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { AuthUser } from './api'
import type { LoginFormValues } from './auth-schema'

export type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  loginError: string | null
  loginForm: UseFormReturn<LoginFormValues>
  loginSubmit: (values: LoginFormValues) => void
  logoutSubmit: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
