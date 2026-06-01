const ACCESS_TOKEN_KEY = 'twin.accessToken'
const REFRESH_TOKEN_KEY = 'twin.refreshToken'

export type StoredTokens = {
  accessToken: string
  refreshToken: string
}

export const authStorage = {
  getAccessToken() {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  setTokens(tokens: StoredTokens) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  },
  clear() {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}
