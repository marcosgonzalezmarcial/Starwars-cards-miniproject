import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { useEffect } from 'react'

export function useClickOutside(elementRef) {
  const { isToggled, toggle } = useLoginMenuCtx()

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
}
