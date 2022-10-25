// import axios from 'axios'

// const fetchData = async (url) => {
//   const movies = await axios.get(url).then((result) => result.data);
//   return movies;
// };

// export { fetchData };

export const fetchData = async (url) => {
  const data = await fetch(url)
    .then((result) => result.json())
    .catch(console.log)
  return data
}

// export { fetchData }
