import { transformPlanetsArray } from '../utils/transformPlanetsArray'
import { fetchPlanets } from './fetchPlanets'

export const getTransformedPlanetsArray = async (page) => {
  const newPlanets = await fetchPlanets(page)
  const newModifiedArr = transformPlanetsArray(newPlanets)
  return newModifiedArr
}
