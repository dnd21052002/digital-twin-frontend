import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../lib/api-error'
import { authStorage } from '../../lib/auth-storage'
import { getMe, login, logout } from './api'
import { AuthContext } from './auth-context'
import { loginSchema, type LoginFormValues } from './auth-schema'

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const hasToken = Boolean(authStorage.getAccessToken())

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: hasToken,
    retry: false,
  })

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      authStorage.setTokens(response)
      queryClient.setQueryData(['me'], response.user)
      navigate('/twin')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      authStorage.clear()
      queryClient.clear()
      navigate('/login')
    },
  })

  const error = loginMutation.error
  const loginError = error instanceof ApiError ? error.message : error ? 'Login failed' : null

  return (
    <AuthContext.Provider
      value={{
        user: meQuery.data ?? null,
        isLoading: meQuery.isLoading,
        loginError,
        loginForm: form,
        loginSubmit: (values) => loginMutation.mutate(values),
        logoutSubmit: () => logoutMutation.mutate(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
