import React, { createContext, useState } from "react";

const uiContext = createContext({});

function UiContextProvider({ children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggle = () => setToggleMenu((prev) => !prev);

  return (
    <uiContext.Provider value={{ toggleMenu, handleToggle }}>
      {children}
    </uiContext.Provider>
  );
}

export { uiContext, UiContextProvider };
