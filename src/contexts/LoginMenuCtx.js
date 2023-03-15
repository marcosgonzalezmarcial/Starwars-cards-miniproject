import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { useToggle } from 'hooks/useToggle'

const LoginMenuCtx = createContext(null)

function LoginMenuCtxProvider({ children }) {
  const [isToggled, toggle] = useToggle(false)
  let elementRef = useRef(null)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isToggled) {
        if (
          elementRef.current &&
          !elementRef.current.contains(e.target) &&
          document.querySelector('.toggle-login-menu-btn') !== e.target
        ) {
          toggle((prev) => !prev)
        }
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [elementRef, isToggled, toggle])

  // momoized value to avoid re renders
  const value = useMemo(
    () => ({
      isToggled,
      toggle,
      elementRef
    }),
    [isToggled, toggle, elementRef]
  )

  return <LoginMenuCtx.Provider value={value}>{children}</LoginMenuCtx.Provider>
}

const useLoginMenuCtx = () => {
  return useContext(LoginMenuCtx)
}

export { LoginMenuCtxProvider, useLoginMenuCtx }
