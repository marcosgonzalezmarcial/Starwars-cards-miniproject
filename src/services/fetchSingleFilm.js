import { API_URL } from '../constants'

export const fetchSingleFilm = async (id) => {
  const data = await fetch(`${API_URL}/films/${id}/`)
  const film = await data.json()
  return film
}
