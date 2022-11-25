import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.scss'
import swLogo from '../assets/logosw.svg'

const initialUserDataState = { email: '', password: '' }

const Login = ({ setLoggedIn, users }) => {
	const [userData, setUserData] = useState(initialUserDataState)
	const [isOpen, setIsOpen] = useState(true)
	const [error, setError] = useState(null)

	let navigate = useNavigate()

	const handleClick = () => {
		setIsOpen(false)
		navigate('/home')
	}

	const handleChangeEmail = e => {
		const user = e.target.value
		setUserData({ ...userData, email: user })
		// setErrorLog(null);
	}
	const handleChangePassword = e => {
		const password = e.target.value
		setUserData({ ...userData, password: password })
		// setErrorLog(null);
	}

	const handleSubmit = e => {
		e.preventDefault()

		const inputValidation = user => {
			return (
				user.email === userData.email && user.password === userData.password
			)
		}

		if (users.length > 0) {
			const checkUser = users.some(user => inputValidation(user))

			if (checkUser) {
				setLoggedIn(true)
				console.log('El usuario se logueó correctamente')
				navigate('/home')
				setError(false)
			} else {
				console.log('El usuario introducido no existe')
				setError(true)
			}
		}
		setUserData(initialUserDataState)
	}

	const handleFormInnerClick = e => e.stopPropagation()

	return (
		<div
			onMouseDown={handleClick}
			className={`loginForm-container ${isOpen && 'is-open'}`}
		>
			<form onSubmit={handleSubmit}>
				<div
					onMouseDown={handleFormInnerClick}
					className="form-inner p-3  position-relative d-flex flex-column align-items-center text-center"
				>
					<img className="login-img my-4 p-2" src={swLogo} alt="logo" />
					<button
						className="form-close-btn position-absolute"
						onClick={handleClick}
					>
						X
					</button>
					<h1 className="form-title">SIGN IN</h1>
					<div className="form-group w-100 my-3">
						<input
							onChange={handleChangeEmail}
							placeholder="Email Address"
							type="email"
							value={userData.email}
							required
						/>
					</div>

					<div className="form-group w-100 my-3">
						<input
							onChange={handleChangePassword}
							placeholder="Password"
							type="password"
							value={userData.password}
							required
						/>
					</div>

					<input type="submit" value="Sign In"></input>
					{error && (
						<>
							<p className="text-danger">El usuario introducido no existe</p>
							<p className="text-info">Inténtalo nuevamente</p>
						</>
					)}
					<div className="sign-up-link">
						<Link to="/signupform">Create an account</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login