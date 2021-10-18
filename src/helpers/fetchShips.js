import axios from "axios";

const fetchShips = async (page) => {
  const apiUrl = `http://swapi.dev/api/starships/?page=${page}`;
  const ships = await axios.get(apiUrl);
  const data = ships.data;

  if (data) {
    return data.results;
  }
};

export { fetchShips };
