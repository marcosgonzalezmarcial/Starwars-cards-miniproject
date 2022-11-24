import { API_URL } from '../constants'

export const fetchPlanets = async (page) => {
  const apiUrl = `${API_URL}/planets/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch((error) => console.log(error))
  return results
}
