import { fetchFilm } from "./fetchFilm"

async function fetchListOfDataFromUrlsArr(filmsUrls) {
  const filmsPromises = await filmsUrls.map(url => fetchFilm(url).then(film => film))
  const films = Promise.all(filmsPromises)
  return films
}

export {fetchListOfDataFromUrlsArr}