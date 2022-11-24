import { API_URL } from '../constants'

export const fetchCharacters = async (page) => {
  const apiUrl = `${API_URL}/people/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch(console.log)
  return results
}
