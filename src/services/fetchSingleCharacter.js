export const fetchSingleCharacter = async (id) => {
  const data = await fetch(`https://swapi.dev/api/people/${id}/`);
  const character = await data.json();
  return character;
};
