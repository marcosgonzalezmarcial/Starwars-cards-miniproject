import { createContext, useState, useCallback, useEffect, useRef } from "react";

// it might be a project-level reusable hook
const useToggle = (initialState) => {
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

const uiContext = createContext({});

function UiContextProvider({ children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [isToggled, toggle] = useToggle(false);

  const closeModal = useCallback(
    () => setShowModal(() => false),
    [setShowModal]
  );
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);

  const handleToggle = useCallback(
    () => setToggleMenu((prev) => !prev),
    [setToggleMenu]
  );

  return (
    <uiContext.Provider
      value={{
        toggleMenu,
        handleToggle,
        openModal,
        closeModal,
        showModal,
        setToggleMenu,
      }}
    >
      {children}
    </uiContext.Provider>
  );
}

export { uiContext, UiContextProvider };
