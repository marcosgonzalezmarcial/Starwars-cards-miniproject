import { transformPlanetsArray } from '../utils/transformPlanetsArray'
import { fetchPlanets } from './fetchPlanets'

export const getTransformedPlanetsArray = async (page) => {
  try {
    const newPlanets = await fetchPlanets(page)
    const newModifiedArr = transformPlanetsArray(newPlanets)
    return newModifiedArr
  } catch (error) {
    console.log(error)
    return null
  }
}
