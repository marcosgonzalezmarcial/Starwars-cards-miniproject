import { createContext, useState, useCallback } from "react";

const uiContext = createContext({});

function UiContextProvider({ children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);
  const handleToggle = useCallback(
    () => setToggleMenu((prev) => !prev),
    [setToggleMenu]
  );
  console.log(toggleMenu);

  return (
    <uiContext.Provider
      value={{
        toggleMenu,
        handleToggle,
        openModal,
        closeModal,
        showModal,
      }}
    >
      {children}
    </uiContext.Provider>
  );
}

export { uiContext, UiContextProvider };
