import { API_URL } from '../constants'

export const fetchShips = async (page) => {
  const apiUrl = `${API_URL}/starships/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch((error) => console.log(error))
  return results
}
