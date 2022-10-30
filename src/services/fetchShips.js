// import axios from 'axios'

// const fetchShips = async (page) => {
//   const apiUrl = `https://swapi.dev/api/starships/?page=${page}`
//   const ships = await axios.get(apiUrl)
//   const data = ships.data

//   if (data) {
//     return data.results
//   }
// }

// export { fetchShips }

export const fetchShips = async (page) => {
  const apiUrl = `https://swapi.dev/api/starships/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch(console.log)
  return results
}
