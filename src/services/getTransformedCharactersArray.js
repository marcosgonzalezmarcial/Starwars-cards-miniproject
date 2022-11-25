import { transformDataArray } from '../utils/transformDataArray'
import { fetchCharacters } from './fetchCharacters'

export const getTransformedCharactersArray = async (page) => {
  try {
    const newPeople = await fetchCharacters(page)
    const newModifiedArr = transformDataArray({fetchedData:newPeople, typeOfData: 'people'})
    return newModifiedArr
  } catch (error) {
    console.log(error)
    return null
  }
}
