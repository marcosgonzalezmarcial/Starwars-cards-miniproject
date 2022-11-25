import React from 'react'
import { Link } from 'react-router-dom'

const LoginNav = ({ loggedIn, setLoggedIn }) => {
	return loggedIn ? (
		<>
			<span></span>
			<Link
				onClick={() => setLoggedIn(!loggedIn)}
				to="/home"
				className="nav-link login-nav-link"
			>
				LOG OUT
			</Link>
			<span></span>
		</>
	) : (
		<>
			<Link className="login-nav-link navbar-link px-md-2" to="/login">
				LOG IN
			</Link>
			<div className="login-nav-link">&#8725; &#8725;</div>
			<Link className="login-nav-link navbar-link px-md-2" to="/signup">
				SIGN UP
			</Link>
		</>
	)
}
export default LoginNav
