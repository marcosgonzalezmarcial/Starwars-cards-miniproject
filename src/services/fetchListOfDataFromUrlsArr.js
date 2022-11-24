import { fetchData } from './fetchData'

export async function fetchListOfDataFromUrlsArr(filmsUrls = []) {
  const filmsPromises = filmsUrls?.map((url) => fetchData(url))
  return Promise.all(filmsPromises)
}
