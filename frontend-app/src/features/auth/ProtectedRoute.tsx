import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authStorage } from '../../lib/auth-storage'
import { useAuth } from './hooks'

export function ProtectedRoute() {
  const location = useLocation()
  const { user, isLoading } = useAuth()
  const hasToken = Boolean(authStorage.getAccessToken())

  if (!hasToken) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (isLoading) return <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-200">Loading session…</div>
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return <Outlet />
}
