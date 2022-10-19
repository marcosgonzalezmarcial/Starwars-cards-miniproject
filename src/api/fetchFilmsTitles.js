import { fetchData } from "./fetchData";

export const fetchFilmsTitles = async (filmUrl) => {
  const film = await fetchData(filmUrl);
  return film.title;
};
