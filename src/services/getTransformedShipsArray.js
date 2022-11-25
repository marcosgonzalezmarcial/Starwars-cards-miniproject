import { transformDataArray } from '../utils/transformDataArray'
import { fetchShips } from './fetchShips'


export const getTransformedShipsArray = async (page) => {
  try {
    const fetchedShips = await fetchShips(page)
    const modifiedShipsArr = transformDataArray({fetchedData:fetchedShips, typeOfData:'starships'})
    return modifiedShipsArr
  } catch (error) {
    console.log(error)
    return null
  }
}
