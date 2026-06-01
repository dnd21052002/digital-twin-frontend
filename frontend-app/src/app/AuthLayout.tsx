import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../features/auth/AuthProvider'

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
