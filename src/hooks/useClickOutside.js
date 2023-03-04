import { useLoginMenuCtx } from 'contexts/LoginMenuCtx'
import { useEffect, useState } from 'react'

export const useClickOutside = (elementRef) => {
  const { isToggled, toggle } = useLoginMenuCtx()

  const [isElementOpen, setIsElementOpen] = useState(true)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isToggled) {
        if (
          elementRef.current &&
          !elementRef.current.contains(e.target) &&
          document.querySelector('.toggle-login-menu-btn') !== e.target
        ) {
          setIsElementOpen((prev) => !prev)
          toggle((prev) => !prev)
        }
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      console.log('remover')
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [elementRef, isToggled, toggle])

  return { isElementOpen, setIsElementOpen }
}
