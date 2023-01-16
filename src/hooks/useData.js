import { useContext } from "react";
import { dataContext } from "contexts/dataContext";

export const useData = () => {
  const data = useContext(dataContext);
  return data;
};
