import { Navigate, Outlet } from 'react-router-dom'
import { useUsers } from 'hooks/useUsers'

export default function ProtectedRoute() {
  const { loggedIn } = useUsers()
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
