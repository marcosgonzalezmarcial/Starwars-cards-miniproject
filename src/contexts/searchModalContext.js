import React, { createContext, useState } from "react";

const searchModalContext = createContext(undefined);

function SearchModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <searchModalContext.Provider value={{ openModal, closeModal, showModal }}>
      {children}
    </searchModalContext.Provider>
  );
}

export { searchModalContext, SearchModalProvider };
