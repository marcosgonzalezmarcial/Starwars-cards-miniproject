import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { useClickOutside } from 'hooks/useClickOutside'
import { useUsers } from 'hooks/useUsers'
import '../Header.scss'
import './LoginNav.scss'

const LoginNav = (/*{ loggedIn, setLoggedIn }*/) => {
  const { loggedIn, setLoggedIn } = useUsers()
  const loginNavRef = useRef()

  const { isToggled: toggleMenu, toggle: handleToggle } = useLoginMenuCtx()
  useClickOutside(loginNavRef)
  // console.log({ isElementOpen })

  const dynamicStyles = useCallback(() => {
    if (!loggedIn) {
      if (window.innerWidth > 768) return 'expanded'
      if (toggleMenu) return 'show collapsed'
      return 'hide collapsed'
    }

    if (window.innerWidth > 768) return 'loggedin expanded'
    if (toggleMenu) return 'loggedin show collapsed'
    return 'loggedin hide collapsed'
  }, [toggleMenu, loggedIn])

  const handleCLickLogin = useCallback(() => setLoggedIn((prev) => !prev), [
    setLoggedIn
  ])

  return (
    <nav ref={loginNavRef} className={`login-nav ${dynamicStyles()}`}>
      {loggedIn ? (
        <Link onClick={handleCLickLogin} to="/" className="login-nav__link">
          LOG OUT
        </Link>
      ) : (
        <>
          <Link onClick={handleToggle} className="login-nav__link" to="/login">
            LOG IN
          </Link>
          <div className="login-nav__link--separator">&#8725; &#8725;</div>
          <Link onClick={handleToggle} className="login-nav__link" to="/signup">
            SIGN UP
          </Link>
        </>
      )}
    </nav>
  )
}
export default LoginNav
