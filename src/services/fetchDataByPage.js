import { API_URL } from '../constants'

export const fetchDataByPage = async ({ page, signal, typeOfData }) => {
  const compoundUrl = `${API_URL}/${typeOfData}/?page=${page}`
  const { results, next } = await fetch(compoundUrl, { signal })
    .then((result) => result.json())
    .catch((error) => console.log(error))
  return { results, next }
}
