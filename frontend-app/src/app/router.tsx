import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from './AuthLayout'
import { LoginPage } from '../features/auth/LoginPage'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
import { AppShell } from '../features/shell/AppShell'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <Navigate to="/twin" replace /> },
          { path: '/twin', element: <AppShell /> },
        ],
      },
    ],
  },
])
