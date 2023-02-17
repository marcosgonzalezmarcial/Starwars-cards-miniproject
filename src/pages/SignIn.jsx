import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import yellowSwLogo from '../assets/yellow-sw-logo.svg'
import './RegisterForm.scss'

const initialUserDetailsState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const SignIn = ({ setUsers }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetailsState)
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsers((prev) => [...prev, userDetails])
    setUserDetails(initialUserDetailsState)
    alert('User created, you can login now')
    navigate('/login')
  }

  const handleClick = () => {
    // setIsOpen(false);
    navigate('/')
  }

  const handleChangeFirstName = (e) => {
    const inputFirstName = e.target.value
    setUserDetails({ ...userDetails, firstName: inputFirstName })
  }
  const handleChangeLastName = (e) => {
    const inputLastName = e.target.value
    setUserDetails({ ...userDetails, lastName: inputLastName })
  }
  const handleChangeEmail = (e) => {
    const inputEmail = e.target.value
    setUserDetails({ ...userDetails, email: inputEmail })
  }
  const handleChangePassword = (e) => {
    const inputPassword = e.target.value
    setUserDetails({ ...userDetails, password: inputPassword })
  }

  return (
    <form className={`register-form is-open`} onSubmit={handleSubmit} action="">
      <div className="register-form__inner-wrapper">
        <img className="register-form__img" src={yellowSwLogo} alt="logo" />
        <button className="register-form__close-btn" onClick={handleClick}>
          X
        </button>
        <h1 className="register-form__title">CREATE YOUR ACCOUNT</h1>

        <input
          className="register-form__input-field"
          onChange={handleChangeFirstName}
          placeholder="First Name"
          type="text"
          value={userDetails.firstName}
          required
        />

        <input
          className="register-form__input-field"
          onChange={handleChangeLastName}
          placeholder="Last Name"
          type="text"
          value={userDetails.lastName}
          required
        />

        <input
          className="register-form__input-field"
          onChange={handleChangeEmail}
          placeholder="Email Adress"
          type="email"
          value={userDetails.email}
          required
        />

        <input
          className="register-form__input-field"
          onChange={handleChangePassword}
          placeholder="Password"
          type="password"
          value={userDetails.password}
          required
        />

        <input type="submit" value="Create Account" />
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

export default SignIn