import { env } from '../config/env'
import { ApiError, parseApiError } from './api-error'
import { authStorage } from './auth-storage'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  skipAuth?: boolean
  skipRefresh?: boolean
}

type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

let refreshPromise: Promise<RefreshResponse> | null = null

async function readJson(response: Response) {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return null
  }
}

async function refreshTokens() {
  const refreshToken = authStorage.getRefreshToken()
  if (!refreshToken) throw new ApiError('Session expired', 'unauthorized', 401)

  refreshPromise ??= apiClient<RefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
    skipAuth: true,
    skipRefresh: true,
  }).finally(() => {
    refreshPromise = null
  })

  const tokens = await refreshPromise
  authStorage.setTokens(tokens)
  return tokens
}

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  const token = authStorage.getAccessToken()
  if (token && !options.skipAuth) headers.set('Authorization', `Bearer ${token}`)

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 10_000)

  try {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
    })

    const payload = await readJson(response)

    if (!response.ok) {
      const error = parseApiError(payload, response.status)
      if (response.status === 401 && error.code === 'unauthorized' && !options.skipRefresh) {
        try {
          await refreshTokens()
          return apiClient<T>(path, { ...options, skipRefresh: true })
        } catch (refreshError) {
          authStorage.clear()
          throw refreshError
        }
      }
      throw error
    }

    return payload as T
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Network unavailable', 'network_error', 0)
  } finally {
    window.clearTimeout(timeout)
  }
}
