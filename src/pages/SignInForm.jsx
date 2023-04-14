import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUsers } from 'hooks/useUsers'
import yellowSwLogo from 'assets/yellow-sw-logo.svg'
import { validateEmail } from 'utils/validateEmail'
import { validatePassword } from 'utils/validatePassword'
import './RegisterForm.scss'

const initialUserDataState = { email: '', password: '' }

export default function SignInForm() {
	const [userData, setUserData] = useState(initialUserDataState)
	const { setLoggedIn, isUserRegistered = false } = useUsers()
	const [emailErrorMessage, setEmailErrorMessage] = useState(null)
	const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

	let navigate = useNavigate()

	const handleChangeEmail = e => {
		const email = e.target.value
		setUserData({ ...userData, email })
		const isValidEmail = validateEmail({ email })
		if ((isValidEmail === false) & (email !== '')) {
			setEmailErrorMessage('Invalid email Address')
		} else {
			setEmailErrorMessage(null)
		}
	}
	const handleChangePassword = e => {
		const password = e.target.value
		setUserData({ ...userData, password })
		const isValidPassword = validatePassword({ password })
		if ((isValidPassword === false) & (password !== '')) {
			setPasswordErrorMessage(
				'It must contain at least one lowercase letter, one uppercase letter, one digit, one special character (i.e. one of @, $, !, %, *, ?, or &), and it must be at least 8 characters long.'
			)
		} else {
			setPasswordErrorMessage(null)
		}
	}
	const areValidCredentials = () =>
		!emailErrorMessage & !passwordErrorMessage ? false : true

	const handleSubmit = e => {
		e.preventDefault()
		const isRegistered = isUserRegistered({ user: userData })
		if (isRegistered === false) {
			alert('El usuario introducido no existe')
			return
		}
		setLoggedIn(true)
		alert('El usuario se registró correctamente')
		navigate('/')
		setUserData(initialUserDataState)
	}

	return (
		<form className={`register-form `} onSubmit={handleSubmit}>
			<div className="register-form__inner-wrapper">
				<img className="register-form__img" src={yellowSwLogo} alt="logo" />
				<h1 className="register-form__title">SIGN IN</h1>
				<input
					className="register-form__input-field"
					onChange={handleChangeEmail}
					placeholder="Email Address"
					type="email"
					value={userData.email}
					required={true}
				/>
				{emailErrorMessage && (
					<p style={{ color: 'red' }}>{emailErrorMessage}</p>
				)}
				<input
					className="register-form__input-field"
					onChange={handleChangePassword}
					placeholder="Password"
					type="password"
					value={userData.password}
					required={true}
				/>
				{passwordErrorMessage && (
					<p style={{ color: 'red' }}>{passwordErrorMessage}</p>
				)}
				<button disabled={areValidCredentials()} type="submit">
					Sign In
				</button>
				<div className="register-form__signup-link">
					<Link to="/signup">Create an account</Link>
				</div>
			</div>
		</form>
	)
}
