import { transformPeopleArray } from '../utils/transformPeopleArray'
import { fetchCharacters } from './fetchCharacters'

// export const getTransformedCharactersArray = async (page) => {
//   const newPeople = await fetchCharacters(page)
//   const newModifiedArr = transformPeopleArray(newPeople)
//   return newModifiedArr
// }

export const getTransformedCharactersArray = async (page) => {
  try {
    const newPeople = await fetchCharacters(page)
    const newModifiedArr = transformPeopleArray(newPeople)
    return newModifiedArr
  } catch (error) {
    console.log(error)
    return null
  }
}
