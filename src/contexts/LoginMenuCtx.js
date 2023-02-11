import {
  createContext,
  useContext,
  useMemo
} from "react";
import { useToggle } from "hooks/useToggle";

const LoginMenuCtx = createContext(null);

function LoginMenuCtxProvider({ children }) {
  const [isToggled, toggle] = useToggle(false);

  const value = useMemo(
    () => ([isToggled, toggle]),
    [isToggled, toggle]
  );

  return (
    <LoginMenuCtx.Provider value={value}>
      {children}
    </LoginMenuCtx.Provider>
  );
}

const useLoginMenuCtx = () => {
  const data = useContext(LoginMenuCtx);
  return data;
};

export { LoginMenuCtx, LoginMenuCtxProvider, useLoginMenuCtx };
