import { fetchData } from './fetchData'

export async function fetchListOfDataFromUrlsArr(filmsUrls) {
  const filmsPromises = await filmsUrls.map((url) => fetchData(url))
  return Promise.all(filmsPromises)
}
