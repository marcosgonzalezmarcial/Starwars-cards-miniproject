import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { useEffect } from 'react'

export function useClickOutside({ elementRef, handleClose }) {
  const { isToggled, toggle } = useLoginMenuCtx()

  let isLoginNavEl = Array.from(elementRef?.current?.classList || []).includes(
    'login-nav'
  )
  console.log(isLoginNavEl)

  useEffect(() => {
    // const checkIfClickedOutside = (e) => {
    //   if (isToggled) {
    //     if (
    //       elementRef.current &&
    //       !elementRef.current.contains(e.target) &&
    //       document.querySelector('.toggle-login-menu-btn') !== e.target
    //     ) {
    //       toggle((prev) => !prev)
    //     }
    //   }
    // }
    const checkIfClickedOutside = (e) => {
      if (elementRef?.current && !elementRef.current.contains(e.target)) {
        handleClose()
      }
    }
    const checkIfClickedOutsideLoginNav = (e) => {
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
    isLoginNavEl
      ? document.addEventListener('mousedown', checkIfClickedOutsideLoginNav)
      : document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
      document.removeEventListener('mousedown', checkIfClickedOutsideLoginNav)
    }
  }, [elementRef, isToggled, toggle, handleClose, isLoginNavEl])
}
