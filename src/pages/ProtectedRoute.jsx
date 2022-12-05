import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ loggedIn }) => {
	if (!loggedIn) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
