import { useState } from 'react'
import { useUsers } from 'hooks/useUsers'
import FormInput from 'components/FormInput'
import { inputs } from 'pages/SignUp/signUpFormInputs'
import yellowSwLogo from 'assets/yellow-sw-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import '../RegisterForm.scss'

const initialUserDetailsState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUp = () => {
	const [values, setValues] = useState(initialUserDetailsState)
	const { setUsers } = useUsers()

	let navigate = useNavigate()

	// const inputs = [
	// 	{
	// 		id: 1,
	// 		name: 'username',
	// 		type: 'text',
	// 		placeholder: 'username',
	// 		errorMessage:
	// 			"First name should be 3-16 characters and shouldn't include any special character!",
	// 		label: 'username',
	// 		pattern: '^[A-Za-z0-9]{3,16}$',
	// 		required: true,
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'email',
	// 		type: 'email',
	// 		placeholder: 'email',
	// 		errorMessage: 'It should be a valid email address!',
	// 		label: 'Email',
	// 		required: true,
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'password',
	// 		type: 'password',
	// 		placeholder: 'password',
	// 		errorMessage:
	// 			'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
	// 		label: 'Password',
	// 		pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
	// 		required: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'confirmPassword',
	// 		type: 'password',
	// 		placeholder: 'confirm password',
	// 		errorMessage: "Passwords don't match!",
	// 		label: 'Confirm Password',
	// 		pattern: values.password,
	// 		required: true,
	// 	},
	// ]

	const handleSubmit = e => {
		e.preventDefault()
		setUsers(prev => [...prev, values])
		setValues(initialUserDetailsState)
		alert('User created, you can login now')
		navigate('/login')
	}

	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	return (
		<form className="register-form" onSubmit={handleSubmit} action="">
			<div className="register-form__inner-wrapper">
				<img className="register-form__img" src={yellowSwLogo} alt="logo" />
				<h1 className="register-form__title">CREATE YOUR ACCOUNT</h1>
				{inputs.map(input => (
					<FormInput
						key={input.id}
						{...input}
						value={values[input.name]}
						onChange={onChange}
						className="register-form__input-field"
						pattern={
							input.name === 'confirmPassword' ? values.password : input.pattern
						}
					/>
				))}
				<button type="submit">Create Account</button>
				<div className="register-form__signin-link">
					<p>Already have an account?</p>
					<span>
						<Link to="/login">Sign In</Link>
					</span>
				</div>
			</div>
		</form>
	)
}

export default SignUp
