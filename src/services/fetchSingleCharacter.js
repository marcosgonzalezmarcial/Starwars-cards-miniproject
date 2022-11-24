import { API_URL } from '../constants'

export const fetchSingleCharacter = async (id) => {
  const data = await fetch(`${API_URL}/people/${id}/`)
  const character = await data.json()
  return character
}
