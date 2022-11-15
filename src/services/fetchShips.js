// export const fetchShips = async (page) => {
//   const apiUrl = `https://swapi.dev/api/starships/?page=${page}`
//   const { results } = await fetch(apiUrl)
//     .then((result) => result.json())
//     .catch((error) => console.log(error))
//   return results
// }

export const fetchShips = async (page) => {
  const apiUrl = `https://swapi.dev/api/starships/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => {
      result.json()
      return results
    })
    .catch((error) => {
      console.log(error)
    })
}
