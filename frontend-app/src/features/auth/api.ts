import { apiClient } from '../../lib/api-client'

export type AuthUser = {
  id: string
  username: string
  email: string
  displayName: string
  avatarInitials: string
  roles: string[]
  permissions: string[]
}

export type LoginRequest = {
  identifier: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: AuthUser
}

export function login(payload: LoginRequest) {
  return apiClient<LoginResponse>('/auth/login', { method: 'POST', body: payload, skipAuth: true, skipRefresh: true })
}

export function logout() {
  return apiClient<{ ok: true }>('/auth/logout', { method: 'POST' })
}

export function getMe() {
  return apiClient<AuthUser>('/me')
}
