import { API_URL } from '../constants'

export const fetchSingleShip = async (id) => {
  const data = await fetch(`${API_URL}/starships/${id}/`)
  const ship = await data.json()
  return ship
}
