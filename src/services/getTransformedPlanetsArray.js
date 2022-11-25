import { transformDataArray } from '../utils/transformDataArray';
import { fetchPlanets } from './fetchPlanets'

export const getTransformedPlanetsArray = async (page) => {
  try {
    const newPlanets = await fetchPlanets(page)
    const newModifiedArr = transformDataArray({fetchedData: newPlanets, typeOfData: 'planets' })
    return newModifiedArr
  } catch (error) {
    console.log(error)
    return null
  }
}
