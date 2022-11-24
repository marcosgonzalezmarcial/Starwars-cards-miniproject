import { transformShipsArray } from '../utils/transformShipsArray'
import { fetchShips } from './fetchShips'

// export const getTransformedShipsArray = async (page) => {
//   const newShips = await fetchShips(page)
//   const modifiedShipsArr = transformShipsArray(newShips)
//   return modifiedShipsArr
// }

export const getTransformedShipsArray = async (page) => {
  try {
    const newShips = await fetchShips(page)
    const modifiedShipsArr = transformShipsArray(newShips)
    return modifiedShipsArr
  } catch (error) {
    console.log(error)
    return null
  }
}
