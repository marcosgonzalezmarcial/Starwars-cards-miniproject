export const fetchShips = async (page) => {
  const apiUrl = `https://swapi.dev/api/starships/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch(console.log)
  return results
}
