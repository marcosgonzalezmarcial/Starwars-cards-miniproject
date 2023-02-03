import { useToggle } from "hooks/useToggle";
import {
  createContext,
  useMemo,
} from "react";



const SearchModalCtx = createContext(null);

function SearchModalCtxProvider({ children }) {
  const [isToggledSearchModal, toggleSearchModal] = useToggle(false);

  const value = useMemo(
    () => ({ isToggledSearchModal, toggleSearchModal }),
    [isToggledSearchModal, toggleSearchModal]
  );


  return (
    <SearchModalCtx.Provider value={value}>{children}</SearchModalCtx.Provider>
  );
}

export { SearchModalCtx, SearchModalCtxProvider };
