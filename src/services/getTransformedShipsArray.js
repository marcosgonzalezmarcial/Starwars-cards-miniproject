import { transformShipsArray } from "../utils/transformShipsArray"
import { fetchShips } from "./fetchShips"

export const getTransformedShipsArray = async (page) => {
  const newShips = await fetchShips(page)
  const modifiedShipsArr = transformShipsArray(newShips)
  return modifiedShipsArr
}