import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";

export const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const isToggledRef = useRef(isToggled);

  // put [isToggledRef, setIsToggled] into the useCallback's dependencies array
  // these values never change so the calllback is not going to be ever re-created
  const toggle = useCallback(
    () => setIsToggled(!isToggledRef.current),
    [isToggledRef, setIsToggled]
  );

  // keep the value in isToggledRef actual
  // when isToggled changes, isToggledRef is updated accordingly
  useEffect(() => {
    isToggledRef.current = isToggled;
  }, [isToggled]);

  return [isToggled, toggle];
};
