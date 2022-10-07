import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoutePeople = ({ loggedIn, children, path }) => (
	<Route
		path={path}
		render={() => (loggedIn ? children : <Redirect to="/loginform" />)}
	/>
)

export default PrivateRoutePeople
