import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import { useToggle } from "hooks/useToggle";

const LoginMenuCtx = createContext(null);

function LoginMenuCtxProvider({ children }) {
  const [isToggled, toggle] = useToggle(false);

  return (
    <LoginMenuCtx.Provider value={[isToggled, toggle]}>
      {children}
    </LoginMenuCtx.Provider>
  );
}

const useLoginMenuCtx = () => {
  const data = useContext(LoginMenuCtx);
  return data;
};

export { LoginMenuCtx, LoginMenuCtxProvider, useLoginMenuCtx };
