import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { useUsers } from 'hooks/useUsers'
import '../Header.scss'
import './LoginNav.scss'

export default function LoginNav() {
  const { loggedIn, setLoggedIn } = useUsers()

  const {
    isToggled: toggleMenu,
    toggle: handleToggle,
    elementRef
  } = useLoginMenuCtx()

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
    <nav ref={elementRef} className={`login-nav ${dynamicStyles()}`}>
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
