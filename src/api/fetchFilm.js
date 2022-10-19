import { fetchData } from "./fetchData";

export const fetchFilm = async (url) => {
  const film = await fetchData(url);
  return film;
};
