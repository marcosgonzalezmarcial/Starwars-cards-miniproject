export const fetchSingleFilm = async (id) => {
  const data = await fetch(`https://swapi.dev/api/films/${id}/`);
  const film = await data.json();
  return film;
};
