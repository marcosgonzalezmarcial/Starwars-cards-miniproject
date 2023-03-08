import { Navigate, Outlet } from 'react-router-dom'
import { useUsers } from 'hooks/useUsers'

const ProtectedRoute = () => {
  const { loggedIn } = useUsers()
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
