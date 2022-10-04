import axios from "axios";

const fetchData = async (url) => {
  const movies = await axios.get(url).then((result) => result.data);
  return movies;
};

export { fetchData };
