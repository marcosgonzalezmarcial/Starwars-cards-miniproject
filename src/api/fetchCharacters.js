import axios from "axios";

export const fetchCharacters = async (page) => {
  const apiUrl = `https://swapi.dev/api/people/?page=${page}`;
  const people = await axios.get(apiUrl).then((result) => result.data);
  return people.results;
};
