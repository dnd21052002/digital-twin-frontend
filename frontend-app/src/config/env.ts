export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1',
  useMockCore: (import.meta.env.VITE_USE_MOCK_CORE ?? 'false') === 'true',
  appName: import.meta.env.VITE_APP_NAME ?? 'Twin@P.CN Digital Twin',
}
