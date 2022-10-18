import { fetchData } from "./fetchData";

export const fetchCharacterData = async (url) => {
  const data = await fetchData(url);
  return data;
};
