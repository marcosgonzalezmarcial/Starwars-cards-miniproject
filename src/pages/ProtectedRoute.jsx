import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NestedRoutes from './NestedRoutes'

const ProtectedRoute = ({ loggedIn }) => {
	if (!loggedIn) {
		return <Navigate to="/loginform" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
