export const fetchPlanets = async (page) => {
  const apiUrl = `https://swapi.dev/api/planets/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => {
      result.json()
      return results
    })
    .catch((error) => {
      console.log(error)
    })
}
