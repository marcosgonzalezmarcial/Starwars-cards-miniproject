import { API_URL } from '../constants'

export const fetchItemByTypeAndId = async ({ id, typeOfData, signal }) => {
  try {
    const data = await fetch(`${API_URL}/${typeOfData}/${id}/`, { signal })
    const item = await data.json()
    return item
  } catch (error) {
    console.log(error)
  }
}
