import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";

export const useToggle_ = () => {
  const [isToggled, setIsToggled] = useState(false);
  console.log("useToggle_");
  console.log(isToggled);

  const toggle = useCallback(() => setIsToggled((prev) => !prev), []);

  return [isToggled, toggle, setIsToggled];
};
