export const fetchSinglePlanet = async (id) => {
  const data = await fetch(`https://swapi.dev/api/planets/${id}/`)
  const planet = await data.json()
  return planet
}
