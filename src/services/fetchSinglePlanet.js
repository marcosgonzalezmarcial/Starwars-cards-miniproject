import { API_URL } from '../constants'

export const fetchSinglePlanet = async (id) => {
  const data = await fetch(`${API_URL}/planets/${id}/`)
  const planet = await data.json()
  return planet
}
