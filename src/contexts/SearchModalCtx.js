import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";

const useToggleSearchModal = () => {
  const [isToggledSearchModal, setIsToggledSearchModal] = useState(false);

  const isToggledSearchModaldRef = useRef(isToggledSearchModal);

  const toggleSearchModal = useCallback(
    () => setIsToggledSearchModal(!isToggledSearchModaldRef.current),
    [isToggledSearchModal, setIsToggledSearchModal]
  );

  useEffect(() => {
    isToggledSearchModaldRef.current = isToggledSearchModal;
  }, [isToggledSearchModal]);

  return { isToggledSearchModal, toggleSearchModal };
};

const SearchModalCtx = createContext(null);

function SearchModalCtxProvider({ children }) {
  const { isToggledSearchModal, toggleSearchModal } = useToggleSearchModal();

  const value = useMemo(
    () => ({ isToggledSearchModal, toggleSearchModal }),
    [isToggledSearchModal, toggleSearchModal]
  );

  return (
    <SearchModalCtx.Provider value={value}>{children}</SearchModalCtx.Provider>
  );
}

export { SearchModalCtx, SearchModalCtxProvider };
