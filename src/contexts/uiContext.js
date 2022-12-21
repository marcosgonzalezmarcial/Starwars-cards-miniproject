import { createContext, useState } from "react";

const uiContext = createContext({});

function UiContextProvider({ children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const handleToggle = () => setToggleMenu((prev) => !prev);

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
