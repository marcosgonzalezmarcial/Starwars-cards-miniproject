import { useContext } from "react";
import { SearchModalCtx } from "contexts/SearchModalCtx";

export const useSearchModal = () => {
  const data = useContext(SearchModalCtx);
  return data;
};
