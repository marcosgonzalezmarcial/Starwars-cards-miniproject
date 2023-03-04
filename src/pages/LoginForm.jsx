import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import yellowSwLogo from 'assets/yellow-sw-logo.svg'
import './RegisterForm.scss'

const initialUserDataState = { email: '', password: '' }

const LoginForm = ({ setLoggedIn, users }) => {
  const [userData, setUserData] = useState(initialUserDataState)

  const formRef = useRef()

  let navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleChangeEmail = (e) => {
    const user = e.target.value
    setUserData({ ...userData, email: user })
    // setErrorLog(null);
  }
  const handleChangePassword = (e) => {
    const password = e.target.value
    setUserData({ ...userData, password: password })
    // setErrorLog(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputValidation = (user) => {
      return (
        user.email === userData.email && user.password === userData.password
      )
    }

    if (users.length > 0) {
      const checkUser = users.some((user) => inputValidation(user))

      if (checkUser) {
        setLoggedIn(true)
        console.log('El usuario se logueó correctamente')
        navigate('/')
        // setError(false)
      } else {
        console.log('El usuario introducido no existe')
        // setError(true)
      }
    }
    setUserData(initialUserDataState)
  }

  // close form clicking ouside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleClick()
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [formRef, handleClick])

  return (
    <form className={`register-form ` /*is-open*/} onSubmit={handleSubmit}>
      <div ref={formRef} className="register-form__inner-wrapper">
        <img className="register-form__img" src={yellowSwLogo} alt="logo" />
        <button className="register-form__close-btn" onClick={handleClick}>
          X
        </button>
        <h1 className="register-form__title">SIGN IN</h1>
        <input
          className="register-form__input-field"
          onChange={handleChangeEmail}
          placeholder="Email Address"
          type="email"
          value={userData.email}
          required={true}
        />
        <input
          className="register-form__input-field"
          onChange={handleChangePassword}
          placeholder="Password"
          type="password"
          value={userData.password}
          required={true}
        />
        <input type="submit" value="Sign In" />
        <div className="register-form__signup-link">
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
