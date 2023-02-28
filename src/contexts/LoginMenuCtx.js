import { createContext, useContext, useMemo } from 'react'
import { useToggle } from 'hooks/useToggle'

const LoginMenuCtx = createContext(null)

function LoginMenuCtxProvider({ children }) {
  const [isToggled, toggle] = useToggle(false)

  // momoized value to avoid re renders
  const value = useMemo(
    () => ({
      isToggled,
      toggle
    }),
    [isToggled, toggle]
  )

  return <LoginMenuCtx.Provider value={value}>{children}</LoginMenuCtx.Provider>
}

const useLoginMenuCtx = () => {
  return useContext(LoginMenuCtx)
}

export { LoginMenuCtxProvider, useLoginMenuCtx }
